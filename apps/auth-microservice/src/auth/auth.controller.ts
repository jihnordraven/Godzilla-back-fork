import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Ip,
	Param,
	ParseUUIDPipe,
	Post,
	Res,
	UseGuards,
	Query
} from "@nestjs/common"
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { Response } from "express"
import { CreateUserDto, NewPassUpdateDto, PassRecoveryDto } from "./core/dto"
import { GithubGuard, JwtAccessGuard, JwtRefreshGuard, LocalAuthGuard } from "./protection/guards"
import {
	SwaggerToAuthorization,
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
	PasswordRecoveryResendCommand
} from "./application/commands"
import { AuthService } from "./application/auth.service"
import { GoogleGuard } from "./protection/guards/google.guard"
import { IGoogleUser } from "./protection/strategies"
import { GooglePayloadDecorator, UserAgentDecorator } from "../../../../libs/common/decorators"
import { TokensEnum } from "../../../../libs/models/enums"
import { ConfigService } from "@nestjs/config"
import { ConfirmEmailCommand } from "./application/commands/confirm-email.command"
import { ConfirmPasswordRecoveryCommand } from "./application/commands/confirm-password-recovery.command"
import { GithubPayloadDecorator } from "libs/common/decorators/github-payload.decorator"
import { MeInfoQuery } from "./application/queries"

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
	async localRegister(@Body() createUser: CreateUserDto): Promise<void> {
		await this.commandBus.execute(new LocalRegisterCommand(createUser))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToRegistrationEmailResending()
	@Post("registration-email-resending")
	async userRegistrationResending(@Body() { email }: { email: string }): Promise<void> {
		await this.commandBus.execute(new ResendEmailCodeCommand({ email }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get("registration-confirmation")
	async userRegistrationConfirm(
		@Query("code", new ParseUUIDPipe()) code: string,
		@Res() res: Response
	): Promise<void> {
		await this.commandBus.execute(new ConfirmEmailCommand({ code, res }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordRecovery()
	@Post("password-recovery")
	async userCreateNewPass(@Body() { email }: PassRecoveryDto): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryCommand({ email }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordEmailResending()
	@Post("password-email-resending")
	async passwordEmailResending(@Body() { email }: { email: string }): Promise<void> {
		await this.commandBus.execute(new PasswordRecoveryResendCommand({ email }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get("password-recovery-confirmation")
	async newPasswordConfirm(@Query("code") code: string, @Res() res: Response): Promise<void> {
		await this.commandBus.execute(new ConfirmPasswordRecoveryCommand({ code, res }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToNewPassword()
	@Post("new-password")
	async userUpdateNewPass(
		@Body() { newPassword, recoveryCode }: NewPassUpdateDto
	): Promise<void> {
		await this.commandBus.execute(new NewPasswordCommand({ recoveryCode, newPassword }))
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@SwaggerToAuthorization()
	@Post("login")
	async userAuthorization(
		@JwtPayloadDecorator()
		jwtPayload: JwtAccessPayload,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res({ passthrough: true }) res: Response
	): Promise<LoginResType> {
		const authObjectDTO: AuthObjectType = {
			userIP,
			userAgent,
			userID: jwtPayload.userID
		}
		const tokens: TokensObjectType = await this.commandBus.execute(
			new LoginCommand(authObjectDTO)
		)

		return this.setTokensToResponse({ tokens, res })
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	@SwaggerToRefreshToken()
	@Post("new-tokens")
	async userRefreshToken(
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
	async userLogout(
		@JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
		@Res({ passthrough: true }) response: Response
	) {
		await this.commandBus.execute(new LogoutCommand(jwtPayload))

		response.clearCookie("refreshToken")
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAccessGuard)
	@SwaggerToMeInfo()
	@Get("me")
	async meInfo(@JwtPayloadDecorator() { userID }: JwtAccessPayload): Promise<MeInfoType> {
		return this.queryBus.execute(new MeInfoQuery({ userID }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(GoogleGuard)
	@Get("google")
	async google() {}

	@UseGuards(GoogleGuard)
	@HttpCode(HttpStatus.OK)
	@Get("google/callback")
	async googleCallback(
		@GooglePayloadDecorator() dto: IGoogleUser,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res() res: Response
	): Promise<LoginResType> {
		const tokens: TokensObjectType = await this.authService.googleRegister(dto, {
			userIP,
			userAgent
		})
		return this.setTokensToResponseGoogle({ tokens, res })
	}

	@Get("github")
	@UseGuards(GithubGuard)
	async github(): Promise<void> {}

	@Get("github/callback")
	@UseGuards(GithubGuard)
	async githubCallback(
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
