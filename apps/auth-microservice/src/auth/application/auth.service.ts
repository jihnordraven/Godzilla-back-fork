import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthRepository } from "../repositories"
import { JwtAccessPayload } from "../../../../../libs/helpers"
import { AuthObjectType, LoginResType, TokensObjectType } from "../core/models"
import { CommandBus } from "@nestjs/cqrs"
import { GithubRegisterCommand, LoginCommand, LogoutCommand } from "./commands"
import { BcryptAdapter } from "../../adapters"
import {
	ConfirmEmailStatusEnum,
	GithubProfile,
	GoogleProfile,
	Sessions,
	User
} from "@prisma/client"
import { GoogleRegisterDto } from "../core/dto/google-register.dto"
import { GoogleRegisterCommand } from "./commands/google-register.command"
import { GithubRegisterDto } from "../core/dto/github-register.dto"

@Injectable()
export class AuthService {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly commandBus: CommandBus,
		protected readonly bcrypt: BcryptAdapter
	) {}

	public async validateLogin(email: string, password: string): Promise<JwtAccessPayload | null> {
		const user: User | null = await this.authRepository.findUniqueUserByEmail({ email })
		if (!user) {
			throw new UnauthorizedException("Invalid login or password")
		}
		if (user.isBlocked) throw new ForbiddenException("User has been blocked")

		const validatePassword: boolean = await this.bcrypt.compare({
			password,
			hash: user.hashPassword
		})

		if (!validatePassword) {
			throw new UnauthorizedException("Invalid login or password")
		}
		if (user.isConfirmed !== ConfirmEmailStatusEnum.CONFIRMED) {
			throw new ForbiddenException("You have to confirm your email")
		}

		return { userID: user.id }
	}

	public async refreshFlow(
		authObjectDTO: AuthObjectType,
		userID: string,
		sessionID: string
	): Promise<TokensObjectType> {
		await this.commandBus.execute(new LogoutCommand({ userID, sessionID }))

		return this.commandBus.execute(new LoginCommand(authObjectDTO))
	}

	public async checkedActiveSession(
		sessionID: string,
		expiredSecondsToken: number
	): Promise<boolean> {
		console.log(sessionID, expiredSecondsToken)
		if (!sessionID) {
			return false
		}

		const activeSession: Sessions | null = await this.authRepository.findUniqueSessionByID({
			sessionID
		})
		if (!activeSession) {
			return false
		}

		const lastActiveToSecond = Number(Date.parse(activeSession.expires).toString().slice(0, 10))
		if (expiredSecondsToken - lastActiveToSecond > 2) {
			return false
		}

		return true
	}

	public async checkedEmailToBase(email: string): Promise<boolean> {
		console.log(email)
		return false
	}

	public async checkedConfirmCode(code: string): Promise<boolean> {
		console.log(code)
		return false
	}

	public async checkedUniqueUsername(userName: string): Promise<boolean> {
		console.log(userName)
		return false
	}

	public async checkedUniqueEmail(email: string): Promise<boolean> {
		console.log(email)
		return false
	}

	public async googleRegister(
		dto: GoogleRegisterDto,
		{ userAgent, userIP }: { userAgent: string; userIP: string }
	): Promise<TokensObjectType> {
		const googleProfile: GoogleProfile = await this.commandBus.execute(
			new GoogleRegisterCommand(dto)
		)
		return this.commandBus.execute(
			new LoginCommand({ userID: googleProfile.userID, userAgent, userIP })
		)
	}

	public async githubRegister(
		dto: GithubRegisterDto,
		{ userAgent, userIP }: { userAgent: string; userIP: string }
	): Promise<TokensObjectType> {
		const githubProfile: GithubProfile = await this.commandBus.execute(
			new GithubRegisterCommand(dto)
		)
		return this.commandBus.execute(
			new LoginCommand({ userID: githubProfile.userID, userAgent, userIP })
		)
	}
}
