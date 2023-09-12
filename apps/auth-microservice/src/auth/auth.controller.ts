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
	Query,
	Req
} from "@nestjs/common"
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger"
import { CommandBus } from "@nestjs/cqrs"
import { Request, Response } from "express"
import {
	CreateUserDto,
	NewPassUpdateDto,
	PasswordRecoveryDto,
	PasswordRecoveryResendDto
} from "./core/dto"
import { GithubGuard, JwtAccessGuard, JwtRefreshGuard, LocalAuthGuard } from "./security/guards"
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
	// GoogleRegisterCommand
} from "./application/commands"
import { AuthService } from "./application/auth.service"
import { GoogleGuard } from "./security/guards/google.guard"
import { UserAgentDecorator } from "../../../../libs/common/decorators"
import { TokensEnum } from "../../../../libs/models/enums"
import { ConfigService } from "@nestjs/config"
import { ResendEmailCodeDto } from "./core/dto/resend-email-code.dto"
import { AuthQueryRepository } from "./repositories"
import { CONFIG } from "../config"
import { GoogleRegisterDto } from "./core/dto/google-register.dto"
import { GithubRegisterDto } from "./core/dto/github-register.dto"
import { GoogleRegisterCommand } from "./application/commands/google-register.command"

type SetTokensToResponseType = {
	readonly tokens: TokensObjectType
	readonly res: Response
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly authQueryRepository: AuthQueryRepository,
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
	public async registrationEmailResen(@Body() dto: ResendEmailCodeDto): Promise<void> {
		this.commandBus.execute(new ResendEmailCodeCommand(dto))
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
	public async passwordRecovery(@Body() dto: PasswordRecoveryDto): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryCommand(dto))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordEmailResending()
	@Post("password-recovery-resend")
	public async passwordEmailResending(@Body() dto: PasswordRecoveryResendDto): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryResendCommand(dto))
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
	): Promise<void> {
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
	): Promise<void> {
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
		return this.authQueryRepository.meInfo({ userID })
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(GoogleGuard)
	@Get("google")
	public google(): void {}

	@UseGuards(GoogleGuard)
	@HttpCode(HttpStatus.OK)
	@SwaggerToGoogleOAuth()
	@Get("google/callback")
	public async googleCallback(@Req() req: Request, @Res() res: Response): Promise<any> {
		// @ts-ignore
		const accessToken: string = req.user?.accessToken
		console.log(accessToken)
		res.redirect(
			`${CONFIG.FRONTEND_HOST}/auth/google?${TokensEnum.ACCESS_TOKEN}=${accessToken}`
		)
	}

	@Post("google/register")
	public async googleRegister(
		@Body() dto: GoogleRegisterDto,
		@UserAgentDecorator() userAgent: string,
		@Ip() userIP: string,
		@Res() res: Response
	): Promise<void> {
		console.log(dto)
		const tokens: TokensObjectType = await this.authService.googleRegister(dto, {
			userAgent,
			userIP
		})
		console.log(tokens)
		return await this.setTokensToResponse({ tokens, res })
	}

	@Get("github")
	@UseGuards(GithubGuard)
	public github(): void {}

	@Get("github/callback")
	@UseGuards(GithubGuard)
	public async githubCallback(@Req() req: Request, @Res() res: Response): Promise<any> {
		// @ts-ignore
		const accessToken: string = req.user.accessToken
		console.log(accessToken)
		res.redirect(
			`${CONFIG.FRONTEND_HOST}/auth/github?${TokensEnum.ACCESS_TOKEN}=${accessToken}`
		)
	}

	@Post("github/register")
	public async githubRegister(
		@Body() dto: GithubRegisterDto,
		@UserAgentDecorator() userAgent: string,
		@Ip() userIP: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensObjectType = await this.authService.githubRegister(dto, {
			userAgent,
			userIP
		})
		return this.setTokensToResponse({ tokens, res })
	}

	// private helpers
	private async setTokensToResponse({ tokens, res }: SetTokensToResponseType): Promise<void> {
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		})
		res.json({ accessToken: tokens.accessToken })
	}
}
