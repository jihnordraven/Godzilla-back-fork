import { CONFIG, swaggerConfig } from '../config/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule } from '@nestjs/swagger';

export const prisma = new PrismaClient();

async function appLoader() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api/v1');

  if (CONFIG.DEPLOY === 'TEST') {
    const options = swaggerConfig.development;
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/testing', app, document);
  }

  await app.listen(CONFIG.PORT);
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
