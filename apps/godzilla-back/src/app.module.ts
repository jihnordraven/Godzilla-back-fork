import { CONFIG } from '../config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CONFIG.START_MODULE],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
