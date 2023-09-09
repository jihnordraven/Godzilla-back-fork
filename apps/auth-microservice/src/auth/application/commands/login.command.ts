import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { add } from "date-fns"
import { JwtService } from "@nestjs/jwt"
import { AuthObjectType, TokensObjectType } from "../../core/models"
import { ConfigService } from "@nestjs/config"
import { Sessions } from "@prisma/client"

export class LoginCommand {
	constructor(public readonly authObject: AuthObjectType) {}
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		protected readonly config: ConfigService,
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly jwtService: JwtService
	) {}
	public async execute({ authObject }: LoginCommand): Promise<TokensObjectType> {
		const expiresTime: string = add(new Date(), {
			seconds: this.config.get<number>("EXPIRES_REFRESH")
		}).toString()

		const newSession: Sessions = await this.authCommandRepository.addNewSession(
			authObject,
			expiresTime
		)

		const refreshToken: string = this.jwtService.sign(
			{ sessionId: newSession.id, userID: newSession.userID },
			{
				secret: this.config.get<string>("JWT_REFRESH_SECRET"),
				expiresIn: `${this.config.get<number>("EXPIRES_REFRESH")}s`
			}
		)

		const accessToken: string = this.jwtService.sign(
			{ userID: newSession.userID },
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
