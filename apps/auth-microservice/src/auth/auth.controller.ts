import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Ip,
	ParseUUIDPipe,
	Post,
	Res,
	UseGuards,
	Query
} from "@nestjs/common"
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { Response } from "express"
import { CreateUserDto, NewPassUpdateDto, PasswordRecoveryResendDto } from "./core/dto"
import { GithubGuard, JwtAccessGuard, JwtRefreshGuard, LocalAuthGuard } from "./protection/guards"
import {
	SwaggerToAuthorization,
	SwaggerToGoogleOAuth,
	SwaggerToLogout,
	SwaggerToMeInfo,
	SwaggerToNewPassword,
	SwaggerToPasswordEmailResending,
	SwaggerToPasswordRecovery,
	SwaggerToRefreshToken,
	SwaggerToRegistration,
	SwaggerToRegistrationEmailResending
} from "../../../../libs/swagger/auth"
import { JwtAccessPayload, JwtPayloadDecorator, JwtRefreshPayload } from "../../../../libs/helpers"
import { AuthObjectType, LoginResType, MeInfoType, TokensObjectType } from "./core/models"
import {
	LoginCommand,
	LogoutCommand,
	LocalRegisterCommand,
	NewPasswordCommand,
	ResendEmailCodeCommand,
	PasswordRecoveryCommand,
	PasswordRecoveryResendCommand,
	PasswordRecoveryConfirmCommand,
	ConfirmEmailCommand
} from "./application/commands"
import { AuthService } from "./application/auth.service"
import { GoogleGuard } from "./protection/guards/google.guard"
import { IGoogleUser } from "./protection/strategies"
import { GooglePayloadDecorator, UserAgentDecorator } from "../../../../libs/common/decorators"
import { TokensEnum } from "../../../../libs/models/enums"
import { ConfigService } from "@nestjs/config"
import { GithubPayloadDecorator } from "libs/common/decorators/github-payload.decorator"
import { MeInfoQuery } from "./application/queries"
import { ResendEmailCodeDto } from "./core/dto/resend-email-code.dto"

type SetTokensToResponseType = {
	readonly tokens: TokensObjectType
	readonly res: Response
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly authService: AuthService,
		private readonly config: ConfigService
	) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToRegistration()
	@Post("registration")
	public async registration(@Body() createUser: CreateUserDto): Promise<void> {
		await this.commandBus.execute(new LocalRegisterCommand(createUser))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToRegistrationEmailResending()
	@Post("registration-email-resend")
	public async registrationEmailResen(
		@Body() { email, code }: ResendEmailCodeDto
	): Promise<void> {
		this.commandBus.execute(new ResendEmailCodeCommand({ email, code }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get("registration-confirmation")
	public async registrationConfirmation(
		@Query("code", new ParseUUIDPipe()) code: string,
		@Res() res: Response
	): Promise<void> {
		this.commandBus.execute(new ConfirmEmailCommand({ code, res }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordRecovery()
	@Post("password-recovery")
	public async userCreateNewPass(@Body() { email }: ResendEmailCodeDto): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryCommand({ email }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordEmailResending()
	@Post("password-recovery-resend")
	public async passwordEmailResending(
		@Body() { code }: PasswordRecoveryResendDto
	): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryResendCommand({ code }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get("password-recovery-confirmation")
	public async newPasswordConfirm(
		@Query("code") code: string,
		@Res() res: Response
	): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryConfirmCommand({ code, res }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToNewPassword()
	@Post("new-password")
	public async userUpdateNewPass(@Body() dto: NewPassUpdateDto): Promise<void> {
		await this.commandBus.execute(new NewPasswordCommand(dto))
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@SwaggerToAuthorization()
	@Post("login")
	public async userAuthorization(
		@JwtPayloadDecorator() payload: JwtAccessPayload,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res({ passthrough: true }) res: Response
	): Promise<LoginResType> {
		const tokens: TokensObjectType = await this.commandBus.execute(
			new LoginCommand({ userIP, userAgent, userID: payload.userID })
		)
		return this.setTokensToResponse({ tokens, res })
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	@SwaggerToRefreshToken()
	@Post("refresh-token")
	public async userRefreshToken(
		@JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res({ passthrough: true }) res: Response
	): Promise<LoginResType> {
		const authObjectDTO: AuthObjectType = {
			userIP,
			userAgent,
			userID: jwtPayload.userID
		}
		const tokens: TokensObjectType = await this.authService.refreshFlow(
			authObjectDTO,
			jwtPayload.userID,
			jwtPayload.sessionID
		)
		return this.setTokensToResponse({ tokens, res })
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtRefreshGuard)
	@SwaggerToLogout()
	@Post("logout")
	public async logout(
		@JwtPayloadDecorator() { userID, sessionID }: JwtRefreshPayload,
		@Res({ passthrough: true }) response: Response
	): Promise<void> {
		await this.commandBus.execute(new LogoutCommand({ userID, sessionID }))
		response.clearCookie("refreshToken")
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAccessGuard)
	@SwaggerToMeInfo()
	@Get("me")
	public async meInfo(@JwtPayloadDecorator() { userID }: JwtAccessPayload): Promise<MeInfoType> {
		return this.queryBus.execute(new MeInfoQuery({ userID }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(GoogleGuard)
	@Get("google")
	public google(): void {}

	@UseGuards(GoogleGuard)
	@HttpCode(HttpStatus.OK)
	@SwaggerToGoogleOAuth()
	@Get("google/callback")
	public async googleCallback(
		@GooglePayloadDecorator() googleUser: IGoogleUser,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res() res: Response
	): Promise<LoginResType> {
		const tokens: TokensObjectType = await this.authService.googleRegister(googleUser, {
			userIP,
			userAgent
		})
		return this.setTokensToResponseGoogle({ tokens, res })
	}

	@Get("github")
	@UseGuards(GithubGuard)
	public github(): void {}

	@Get("github/callback")
	@UseGuards(GithubGuard)
	public async githubCallback(
		@GithubPayloadDecorator() dto: any,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res() res: Response
	): Promise<void> {
		console.log(dto)
		// const tokens: TokensObjectType = await this.authService.githubRegister()
		// return this.setTokensToResponseGoogle({ tokens, res })
	}

	// private helpers
	private async setTokensToResponse({
		tokens,
		res
	}: SetTokensToResponseType): Promise<LoginResType> {
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		})
		return { accessToken: tokens.accessToken }
	}

	private async setTokensToResponseGoogle({
		tokens,
		res
	}: SetTokensToResponseType): Promise<LoginResType> {
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		})
		res.redirect(this.config.get<string>("FRONTEND_HOST"))
		return { accessToken: tokens.accessToken }
	}
}
