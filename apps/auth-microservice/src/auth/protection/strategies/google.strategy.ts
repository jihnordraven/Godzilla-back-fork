import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { CONFIG } from "../../../config/config"
import { Profile, Strategy } from "passport-google-oauth20"

export interface IGoogleUser {
	readonly providerID: string
	readonly email: string
	readonly username: string | null
	readonly displayName: string
	readonly provider: string
	readonly photo: string | null
	readonly accessToken: string
	readonly refreshToken: string | null
}

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
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	): Promise<void> {
		try {
			const user: IGoogleUser = {
				providerID: profile.id,
				email: profile.emails[0].value,
				username: profile.username,
				displayName: profile.displayName,
				provider: profile.provider,
				photo: profile.photos[0].value,
				accessToken,
				refreshToken
			}
			done(null, user)
		} catch (err: unknown) {
			done(err)
			throw new UnauthorizedException(err)
		}
	}
}
