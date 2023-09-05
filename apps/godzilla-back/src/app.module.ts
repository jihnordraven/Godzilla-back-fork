import { CONFIG } from './config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import {
  JwtAccessStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
} from './auth/guards-handlers/strategies';

const strategy = [LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy];

@Module({
  imports: [CONFIG.START_MODULE, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, ...strategy],
})
export class AppModule {}
