import { CONFIG } from '../config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CONFIG.START_MODULE, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
