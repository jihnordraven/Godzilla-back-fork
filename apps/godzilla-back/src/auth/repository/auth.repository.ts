import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SessionsBaseType, UserBaseType } from '../../../../../library/models';
import { AuthObjectType, SessionsBaseAndUserType } from '../core/models';

@Injectable()
export class AuthRepository {
  constructor(protected prisma: PrismaService) {}

  async findUserToEmail(email: string): Promise<UserBaseType | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async addNewSession(
    authObject: AuthObjectType,
    expiresTime: string,
  ): Promise<SessionsBaseAndUserType> {
    return await this.prisma.sessions.create({
      data: {
        ip: authObject.ip,
        title: authObject.nameDevice,
        sessionExpired: expiresTime,
        user: {
          connect: {
            id: authObject.userID,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }
}
