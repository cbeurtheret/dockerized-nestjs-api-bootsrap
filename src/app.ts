// file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@core/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest,
} from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { PromService } from '@digikare/nestjs-prom';
import { MonitoringExceptionsFilter } from '@commons/filters';
import * as Pkg from '@root/package.json';

export class App {
  public static async bootstrap() {
    console.info(`Starting ${Pkg.description}`);
    console.debug('Root dir => ', __dirname);

    const app = await NestFactory.create(AppModule, {
      cors: true,
      bufferLogs: true,
    });

    // Logging
    const globalLogger = new NestjsWinstonLoggerService({
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.json(),
        format.colorize({ all: true }),
      ),
      transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.Console(),
      ],
    });
    app.useLogger(globalLogger);

    // append id to identify request
    app.use(appendIdToRequest);
    app.use(appendRequestIdToLogger(globalLogger));

    app.use(morganRequestLogger(globalLogger));
    app.use(morganResponseLogger(globalLogger));

    app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));

    // Validation
    app.useGlobalPipes(new ValidationPipe());

    // Monitoring
    const promService = app.get(PromService);
    app.useGlobalFilters(new MonitoringExceptionsFilter(promService));

    // OpenAPI
    const options = new DocumentBuilder()
      .setTitle(Pkg.description)
      .setDescription(`${Pkg.description} documentation`)
      .setVersion(Pkg.version)
      .addTag('My Home')
      .addTag('Notifications')
      // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${Pkg.name}-doc`, app, document);

    const port = process.env.SERVER_PORT || 3000;
    await app.listen(port).then(() => {
      console.info(`🚀 ${Pkg.description} listening on port ${port}`);
    });
  }
}
