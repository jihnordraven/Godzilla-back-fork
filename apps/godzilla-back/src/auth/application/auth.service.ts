import { Injectable } from "@nestjs/common"
import { AuthRepository } from "../repository/auth.repository"
import { JwtAccessPayload } from "@libs/helpers"
import { AuthObjectType, TokensObjectType } from "../core/models"
import { CommandBus } from "@nestjs/cqrs"
import { GoogleRegisterCommand, LoginCommand, LogoutCommand } from "./commands"
import { BcryptAdapter } from "../../adapters"
import { GoogleProfile, Sessions, User } from "@prisma/client"
import { IGoogleUser } from "../guards-handlers/strategies"

@Injectable()
export class AuthService {
	constructor(
		protected authRepository: AuthRepository,
		protected commandBus: CommandBus,
		protected bcrypt: BcryptAdapter
	) {}

	async validateLogin(
		email: string,
		password: string
	): Promise<JwtAccessPayload | null> {
		const user: User | null = await this.authRepository.findUserToEmail({ email })

		if (!user || user.isBlocked === true) {
			return null
		}

		const validatePassword: boolean = await this.bcrypt.compare({
			password,
			hash: user.hashPassword
		})

		if (!validatePassword) {
			return null
		}

		return { userId: user.id }
	}

	async refreshFlow(
		authObjectDTO: AuthObjectType,
		userId: string,
		sessionId: string
	): Promise<TokensObjectType> {
		await this.commandBus.execute(new LogoutCommand(userId, sessionId))

		return await this.commandBus.execute(new LoginCommand(authObjectDTO))
	}

	async checkedActiveSession(
		sessionId: string,
		expiredSecondsToken: number
	): Promise<boolean> {
		if (!sessionId) {
			return false
		}

		const activeSession: Sessions | null =
			await this.authRepository.findActiveSession(sessionId)

		if (!activeSession) {
			return false
		}

		const lastActiveToSecond = Number(
			Date.parse(activeSession.expires).toString().slice(0, 10)
		)

		if (expiredSecondsToken - lastActiveToSecond > 2) {
			return false
		}

		return true
	}

	async checkedEmailToBase(email: string): Promise<boolean> {
		console.log(email)
		return false
	}

	async checkedConfirmCode(code: string): Promise<boolean> {
		console.log(code)
		return false
	}

	async checkedUniqueUsername(userName: string): Promise<boolean> {
		console.log(userName)
		return false
	}

	async checkedUniqueEmail(email: string): Promise<boolean> {
		console.log(email)
		return false
	}

	async googleRegister(
		dto: IGoogleUser,
		{ userIP, userAgent }: { userIP: string; userAgent: string }
	): Promise<TokensObjectType> {
		const user: GoogleProfile = await this.commandBus.execute(
			new GoogleRegisterCommand(dto)
		)
		return this.commandBus.execute(
			new LoginCommand({ userIP, userAgent, userID: user.userId })
		)
	}
}
