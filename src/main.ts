import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('App');
  logger.verbose('Starting application...');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        /\.juicy\.space$/,
        /\.vercel\.app$/,
        /^http:\/\/localhost:\d{4}/,
      ];

      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'files'), {
    prefix: '/public',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(3000);
  logger.verbose('Application started successfully');
}

bootstrap();
