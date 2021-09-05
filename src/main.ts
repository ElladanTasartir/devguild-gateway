import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import './config';
import { port } from './config';
import { GlobalExceptionFilter } from './exceptions/global-exceptions.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: '*',
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(port, () =>
    logger.log(`Devguild Gateway listening on port "${port}"`),
  );
}
bootstrap();
