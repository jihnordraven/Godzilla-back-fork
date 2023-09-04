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
import { PassportModule } from '@nestjs/passport';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { LoginUseCase, MeInfoUseCase } from './application/commands';
import { JwtModule } from '@nestjs/jwt';

const validators = [
  CheckedEmailToBase,
  CheckedConfirmCode,
  CheckedUniqueUsername,
  CheckedUniqueEmail,
];

const commands = [LoginUseCase, MeInfoUseCase];

const adapters = [BcryptAdapter];

const modules = [CqrsModule, PrismaModule, PassportModule, JwtModule];

@Module({
  imports: [...modules],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    ...validators,
    ...adapters,
    ...commands,
  ],
  exports: [AuthService],
})
export class AuthModule {}
