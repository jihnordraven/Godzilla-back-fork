import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { AuthController } from "./auth.controller"
import {
	CheckedConfirmCode,
	CheckedEmailToBase,
	CheckedUniqueEmail,
	CheckedUniqueUsername
} from "./class-validators"
import { AuthService } from "./application/auth.service"
import { PrismaModule } from "../prisma/prisma.module"
import { PassportModule } from "@nestjs/passport"
import { BcryptAdapter, MailerAdapter } from "../adapters"
import {
	LocalRegisterHandler,
	ResendEmailCodeHandler,
	PasswordRecoveryHandler,
	NewPasswordHandler,
	PasswordRecoveryResendHandler,
	GoogleRegisterHandler,
	ConfirmEmailHandler,
	ConfirmPasswordRecoveryHandler,
	LogoutHandler,
	LoginHandler
} from "./application/commands"
import { JwtModule } from "@nestjs/jwt"
import { AuthCommandRepository, AuthQueryRepository } from "./repositories"
import { MeInfoHandler } from "./application/queries"

const validators = [
	CheckedEmailToBase,
	CheckedConfirmCode,
	CheckedUniqueUsername,
	CheckedUniqueEmail
]

const commandHandlers = [
	LoginHandler,
	LocalRegisterHandler,
	ResendEmailCodeHandler,
	PasswordRecoveryHandler,
	PasswordRecoveryResendHandler,
	NewPasswordHandler,
	LogoutHandler,
	GoogleRegisterHandler,
	ConfirmPasswordRecoveryHandler,
	ConfirmEmailHandler
]

const queryHandlers = [MeInfoHandler]

const adapters = [BcryptAdapter, MailerAdapter]

const modules = [CqrsModule, PrismaModule, PassportModule, JwtModule]

@Module({
	imports: [...modules],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthCommandRepository,
		AuthQueryRepository,
		...validators,
		...adapters,
		...commandHandlers,
		...queryHandlers
	],
	exports: [AuthService]
})
export class AuthModule {}
