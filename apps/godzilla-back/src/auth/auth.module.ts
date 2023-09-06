import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AuthController } from './auth.controller'
import {
	CheckedConfirmCode,
	CheckedEmailToBase,
	CheckedUniqueEmail,
	CheckedUniqueUsername
} from './class-validators'
import { AuthService } from './application/auth.service'
import { AuthRepository } from './repository/auth.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { PassportModule } from '@nestjs/passport'
import { BcryptAdapter, ActivateCodeAdapter, MailerAdapter } from '../adapters'
import {
	LoginUseCase,
	LocalRegisterHandler,
	ResendEmailCodeHandler,
	PasswordRecoveryHandler,
	NewPasswordHandler,
	PasswordRecoveryResendHandler,
  LogoutUseCase,
  MeInfoUseCase,
} from './application/commands'
import { JwtModule } from '@nestjs/jwt'

const validators = [
	CheckedEmailToBase,
	CheckedConfirmCode,
	CheckedUniqueUsername,
	CheckedUniqueEmail
]

const commandHandlers = [
	LoginUseCase,
	LocalRegisterHandler,
	ResendEmailCodeHandler,
	PasswordRecoveryHandler,
	PasswordRecoveryResendHandler,
	NewPasswordHandler,
  MeInfoUseCase,
  LogoutUseCase
]

const adapters = [BcryptAdapter, MailerAdapter, ActivateCodeAdapter]

const modules = [CqrsModule, PrismaModule, PassportModule, JwtModule]

@Module({
	imports: [...modules],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthRepository,
		...validators,
		...adapters,
		...commandHandlers
	],
	exports: [AuthService]
})
export class AuthModule {}
