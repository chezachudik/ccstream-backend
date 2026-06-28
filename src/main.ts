import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  app.use(cookieParser());

  const config=app.get(ConfigService);

  app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGINS').split(',').map(origin => origin.trim()),
    credentials: true,
    exposedHeaders: ['set-cookie']
  });

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
