import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { CONFIG } from "../../../config/config"
import { Strategy } from "passport-google-oauth20"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			clientID: CONFIG.GOOGLE_CLIENT_ID,
			clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
			callbackURL: `${CONFIG.HOST}/api/v1/auth/google/callback`,
			scope: ["profile", "email"]
		})
	}

	async validate(
		accessToken: string
		// refreshToken: string,
		// profile: Profile,
		// done: any
	): Promise<any> {
		try {
			return { accessToken }
		} catch (err: unknown) {
			throw new UnauthorizedException(err)
		}
	}
}
