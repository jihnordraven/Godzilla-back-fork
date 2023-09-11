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
import { AuthCommandRepository, AuthQueryRepository } from "./repositories"
import { AUTH_QUERY_HANDLERS } from "./application/queries"
import { AUTH_COMMAND_HANDLERS } from "./application/commands"

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
		AuthCommandRepository,
		AuthQueryRepository,
		...validators,
		...adapters,
		...AUTH_COMMAND_HANDLERS,
		...AUTH_QUERY_HANDLERS
	],
	exports: [AuthService]
})
export class AuthModule {}
