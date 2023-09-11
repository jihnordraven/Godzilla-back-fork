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
import { JwtModule } from "@nestjs/jwt"
import { AUTH_COMMAND_HANDLERS } from "./application/commands"
import { AuthQueryRepository, AuthRepository } from "./repositories"

const validators = [
	CheckedEmailToBase,
	CheckedConfirmCode,
	CheckedUniqueUsername,
	CheckedUniqueEmail
]

const adapters = [BcryptAdapter, MailerAdapter]

const modules = [CqrsModule, PrismaModule, PassportModule, JwtModule]

@Module({
	imports: [...modules],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthRepository,
		AuthQueryRepository,
		...validators,
		...adapters,
		...AUTH_COMMAND_HANDLERS
	],
	exports: [AuthService]
})
export class AuthModule {}
