import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "../../application/auth.service"
import { JwtAccessPayload } from "@libs/helpers"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: "email"
		})
	}
	async validate(email: string, password: string): Promise<JwtAccessPayload | null> {
		return await this.authService.validateLogin(email, password)
	}
}
