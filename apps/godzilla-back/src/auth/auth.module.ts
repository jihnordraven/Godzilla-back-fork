import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { CheckedConfirmCode, CheckedEmailToBase } from './class-validators';
import { AuthService } from './application/auth.service';
import { AuthRepository } from './repository/auth.repository';
import { CheckedUniqueUsername } from './class-validators/checkedUniqueUsername.class-validators';
import { CheckedUniqueEmail } from './class-validators/checkedUniqueEmail.class-validators';
import { PrismaModule } from '../../../../library/prisma/prisma.module';

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
