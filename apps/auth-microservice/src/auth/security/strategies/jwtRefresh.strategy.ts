import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../../application/auth.service"
import { JwtRefreshPayload, RefreshCookieExtractor } from "../../../../../../libs/helpers"
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

	async validate(payload: JwtRefreshPayload) {
		const validateSession: boolean = await this.authService.checkedActiveSession(
			payload.sessionID,
			payload.iat
		)
		if (!validateSession) {
			throw new UnauthorizedException()
		}
		return { userID: payload.userID, sessionID: payload.sessionID }
	}
}
