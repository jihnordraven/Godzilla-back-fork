import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { CONFIG } from "../../../config"
import { Profile, Strategy } from "passport-github2"

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			clientID: CONFIG.GITHUB_CLIENT_ID,
			clientSecret: CONFIG.GITHUB_CLIENT_SECRET,
			callbackURL: `${CONFIG.HOST}/api/v1/auth/github/callback`,
			scope: ["public_profile", "email"]
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string | null,
		profile: Profile
	): Promise<any> {
		return { accessToken, refreshToken, profile }
	}
}
