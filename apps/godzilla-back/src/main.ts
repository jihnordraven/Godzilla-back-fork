import { CONFIG } from '../config/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.setGlobalPrefix('api/v1');
    await prisma.$connect();
    await app.listen(CONFIG.PORT);
    console.log(`Start server on ${CONFIG.PORT} port`);
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
