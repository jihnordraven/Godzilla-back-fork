import { ForbiddenException, Injectable } from '@nestjs/common';
import { CONFIG } from './config/config';
import { AllTablesEnum } from '../../../library/models';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(protected readonly prisma: PrismaService) {}
  async getHello(): Promise<string> {
    return await `Start server on ${CONFIG.PORT} port`;
  }

  async deleteAll() {
    if (CONFIG.DEPLOY === 'TEST') {
      for (const table of Object.values(AllTablesEnum)) {
        if (this.prisma[table]) {
          await this.prisma[table].deleteMany();
        }
      }
    } else {
      throw new ForbiddenException('This endpoint is closed for prodaction');
    }
  }
}
