import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import {
  CheckedConfirmCode,
  CheckedEmailToBase,
  CheckedUniqueEmail,
  CheckedUniqueUsername,
} from './class-validators';
import { AuthService } from './application/auth.service';
import { AuthRepository } from './repository/auth.repository';
import { PrismaModule } from '../prisma/prisma.module';

const validators = [
  CheckedEmailToBase,
  CheckedConfirmCode,
  CheckedUniqueUsername,
  CheckedUniqueEmail,
];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...validators],
})
export class AuthModule {}
