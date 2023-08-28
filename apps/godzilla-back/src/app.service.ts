import { Injectable } from '@nestjs/common';
import { CONFIG } from '../config/config';

@Injectable()
export class AppService {
  getHello(): string {
    return `Start server on ${CONFIG.PORT} port`;
  }
}
