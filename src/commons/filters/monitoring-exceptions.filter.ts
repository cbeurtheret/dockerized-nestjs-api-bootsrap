import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import {
  CounterMetric,
  PromService,
  IMetricArguments,
} from '@digikare/nestjs-prom';
import { normalizePath } from '@commons/utils';
import { MESSAGES } from '@nestjs/core/constants';

function getBaseUrl(url?: string) {
  if (!url) {
    return url;
  }

  if (url.indexOf('?') === -1) {
    return url;
  }
  return url.split('?')[0];
}

@Catch()
export class MonitoringExceptionsFilter implements ExceptionFilter {
  private readonly _counter: CounterMetric;

  constructor(protected readonly promService: PromService) {
    this._counter = this.promService.getCounter({
      name: 'http_exceptions',
      labelNames: ['method', 'status', 'path'],
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.countDecoratedException(exception);
    this.countHttpExceptions(request, status);

    let body: any;
    if (!(exception instanceof HttpException)) {
      body = this.handleUnknownError(exception);
    } else {
      const res = exception.getResponse();
      body = isObject(res)
        ? res
        : {
            statusCode: exception.getStatus(),
            message: res,
          };
    }

    ctx.getResponse().status(status).send(body);
  }

  protected handleUnknownError(exception: unknown) {
    const body = this.isHttpError(exception)
      ? {
          statusCode: exception.statusCode,
          message: exception.message,
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        };
    return body;
  }

  protected isExceptionObject(err: any): err is Error {
    return isObject(err) && !!(err as Error).message;
  }

  protected isHttpError(
    err: any,
  ): err is { statusCode: number; message: string } {
    return err?.statusCode && err?.message;
  }

  protected countDecoratedException(exc: any): void {
    if (exc.counter) {
      const counterMetadata = exc.counterMetadata;
      const counter = this.promService.getCounter(
        counterMetadata as IMetricArguments,
      );
      const labels = exc.context;
      counter.inc(labels);
    }
  }

  protected countHttpExceptions(request: any, status: number) {
    const path = normalizePath(
      getBaseUrl(request.baseUrl || request.url),
      [],
      '#val',
    );

    this._counter.inc({
      method: request.method,
      path,
      status,
    });
  }
}
