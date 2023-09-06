import { CONFIG } from './config/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '../../../library/swagger/config.swagger';
import { ValidationPipe } from '@nestjs/common';
import { validatePipeOptions } from '../../../library/errors-handlers/validatePipeOptions';
import { HttpExceptionFilter } from '../../../library/errors-handlers/http-exception.filter';
import cookieParser from 'cookie-parser';

export const prisma = new PrismaClient();

async function appLoader() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://godzilla-front.vercel.app/',
      'https://godzillagram.com/',
    ],
    credentials: true,
  });

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(validatePipeOptions));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api/v1');

  if (CONFIG.DEPLOY === 'TEST') {
    const options = swaggerConfig.development;
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/testing', app, document, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });
  }

  await app.listen(CONFIG.PORT || 3000);
}

async function bootstrap() {
  try {
    await appLoader();
    await prisma.$connect();
    console.log(`Start server on ${CONFIG.PORT} port`);
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
