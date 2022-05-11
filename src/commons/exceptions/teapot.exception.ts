import { ImATeapotException } from '@nestjs/common';
import { Counter } from '@commons/decorators';

@Counter({
  name: 'TEAPOT_EXCEPTION',
  help: 'Count all TeapotExceptions',
  labelNames: ['teapot'],
})
export class TeapotException extends ImATeapotException {
  public static builder() {
    return new TeapotExceptionBuilder();
  }
}

export class TeapotExceptionBuilder {
  private objectOrError?: string | object | any;
  private description?: string;
  private context?: any;

  setObjectOrError(
    objectOrError: string | object | any,
  ): TeapotExceptionBuilder {
    this.objectOrError = objectOrError;
    return this;
  }

  setDescription(description: string): TeapotExceptionBuilder {
    this.description = description;
    return this;
  }

  setContext(context: any): TeapotExceptionBuilder {
    this.context = context;
    return this;
  }

  build(): TeapotException {
    const exc = new TeapotException(this.objectOrError, this.description);
    exc['context'] = this.context;
    return exc;
  }
}
