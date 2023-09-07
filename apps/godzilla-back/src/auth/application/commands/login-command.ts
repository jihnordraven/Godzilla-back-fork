import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthRepository } from "../../repository/auth.repository"
import { add } from "date-fns"
import { JwtService } from "@nestjs/jwt"
import { AuthObjectType, TokensObjectType } from "../../core/models"
import { ConfigService } from "@nestjs/config"
import { Sessions } from "@prisma/client"

export class LoginCommand {
	constructor(public readonly authObject: AuthObjectType) {}
}

@CommandHandler(LoginCommand)
export class LoginUseCase implements ICommandHandler<LoginCommand> {
	constructor(
		protected readonly config: ConfigService,
		protected authRepository: AuthRepository,
		protected jwtService: JwtService
	) {}
	async execute({ authObject }: LoginCommand): Promise<TokensObjectType> {
		const expiresTime: string = add(new Date(), {
			seconds: this.config.get<number>("EXPIRES_REFRESH")
		}).toString()

		const newSession: Sessions = await this.authRepository.addNewSession(
			authObject,
			expiresTime
		)

		const refreshToken: string = this.jwtService.sign(
			{ sessionId: newSession.id, userId: newSession.userOwnerId },
			{
				secret: this.config.get<string>("JWT_REFRESH_SECRET"),
				expiresIn: `${this.config.get<number>("EXPIRES_REFRESH")}s`
			}
		)

		const accessToken: string = this.jwtService.sign(
			{ userId: newSession.userOwnerId },
			{
				secret: this.config.get<string>("JWT_ACCESS_SECRET"),
				expiresIn: `${this.config.get<number>("EXPIRES_ACCESS")}s`
			}
		)

		return {
			refreshToken: refreshToken,
			accessToken: accessToken
		}
	}
}
