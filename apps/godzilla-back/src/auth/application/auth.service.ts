import { Injectable } from '@nestjs/common'
import { AuthRepository } from '../repository/auth.repository'
import { SessionsBaseType, UserBaseType } from '../../../../../library/models'
import { JwtAccessPayload } from '../../../../../library/helpers'
import { AuthObjectType, TokensObjectType } from '../core/models'
import { CommandBus } from '@nestjs/cqrs'
import { LoginCommand, LogoutCommand } from './commands'
import { BcryptAdapter } from '../../adapters'
import { User } from '@prisma/client'

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
		const user: User | null = await this.authRepository.findUserToEmail(email)

		if (!user || user.isBlocked === true) {
			return null
		}

		const validatePassword: boolean = await this.bcrypt.hushCompare(
			password,
			user.hashPassword
		)

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

		const activeSession: SessionsBaseType | null =
			await this.authRepository.findActiveSession(sessionId)

		if (!activeSession) {
			return false
		}

		const lastActiveToSecond = Number(
			Date.parse(activeSession.sessionExpired).toString().slice(0, 10)
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
}
