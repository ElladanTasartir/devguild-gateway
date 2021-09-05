import { ArgumentsHost, Catch, HttpServer, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { AxiosError } from 'axios';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.catch(exception, host);
  }

  handleUnknownError(
    exception: AxiosError,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter | HttpServer,
  ) {
    if (exception.isAxiosError) {
      const body = {
        ...exception.response.data,
      };
      applicationRef.reply(
        host.getArgByIndex(1),
        body,
        Number(body.statusCode),
      );
      return;
    }

    const body = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
    applicationRef.reply(host.getArgByIndex(1), body, body.statusCode);
  }
}
