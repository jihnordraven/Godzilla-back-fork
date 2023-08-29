import { ForbiddenException, Injectable } from '@nestjs/common';
import { CONFIG } from '../config/config';
import { AllTablesEnum } from '../../../library/models';
import { prisma } from './main';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return await `Start server on ${CONFIG.PORT} port`;
  }

  async deleteAll() {
    if (CONFIG.DEPLOY === 'TEST') {
      for (const table of Object.values(AllTablesEnum)) {
        if (prisma[table]) {
          await prisma[table].deleteMany();
        }
      }
    } else {
      throw new ForbiddenException('This endpoint is closed for prodaction');
    }
  }
}
