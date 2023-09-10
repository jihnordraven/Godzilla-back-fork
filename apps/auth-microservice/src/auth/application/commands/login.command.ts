import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { add } from "date-fns"
import { JwtService } from "@nestjs/jwt"
import { AuthObjectType, TokensObjectType } from "../../core/models"
import { ConfigService } from "@nestjs/config"
import { Sessions } from "@prisma/client"
import { CONFIG } from "apps/auth-microservice/src/config"

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
			seconds: Number(CONFIG.JWT_ACCESS_EXPIRES)
		}).toString()

		const newSession: Sessions = await this.authCommandRepository.addNewSession(
			authObject,
			expiresTime
		)

		const refreshToken: string = this.jwtService.sign(
			{ sessionId: newSession.id, userID: newSession.userID },
			{
				secret: CONFIG.JWT_REFRESH_SECRET,
				expiresIn: Number(CONFIG.JWT_REFRESH_EXPIRES)
			}
		)

		const accessToken: string = this.jwtService.sign(
			{ userID: newSession.userID },
			{
				secret: CONFIG.JWT_ACCESS_SECRET,
				expiresIn: Number(CONFIG.JWT_ACCESS_EXPIRES)
			}
		)

		return {
			refreshToken: refreshToken,
			accessToken: accessToken
		}
	}
}
