import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../../application/auth.service"
import { RefreshCookieExtractor } from "../../../../../../libs/helpers"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refreshToken") {
	constructor(
		private readonly config: ConfigService,
		protected authService: AuthService
	) {
		super({
			jwtFromRequest: RefreshCookieExtractor,
			ignoreExpiration: false,
			secretOrKey: config.get<string>("JWT_REFRESH_SECRET")
		})
	}

	async validate(payload: any) {
		const validateSession: boolean = await this.authService.checkedActiveSession(
			payload.sessionId,
			payload.iat
		)

		if (!validateSession) {
			throw new UnauthorizedException("Session expired")
		}
		return { userId: payload.userId, sessionId: payload.sessionId }
	}
}
