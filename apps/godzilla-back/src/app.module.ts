import { CONFIG } from '../../../library/config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../../../library/prisma/prisma.module';

@Module({
  imports: [CONFIG.START_MODULE, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
