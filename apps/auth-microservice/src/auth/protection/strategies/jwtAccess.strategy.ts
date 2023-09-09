import { Injectable } from "@nestjs/common"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { JwtAccessPayload } from "../../../../../../libs/helpers"
import { ConfigService } from "@nestjs/config"

export const AccessCookieExtractor = function (req) {
	let token = null

	if (req && req.cookies["refreshToken"]) {
		token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
	}

	return token
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.get<string>("JWT_ACCESS_SECRET")
		})
	}

	async validate(payload: JwtAccessPayload): Promise<JwtAccessPayload> {
		console.log(payload.userID)
		return { userID: payload.userID }
	}
}
