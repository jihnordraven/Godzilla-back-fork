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
import { CommandBus } from "@nestjs/cqrs"
import { Response } from "express"
import { CreateUserDto, NewPassUpdateDto, PassRecoveryDto } from "./core/dto"
import { JwtAccessGuard, JwtRefreshGuard, LocalAuthGuard } from "./guards-handlers/guards"
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
	MeInfoCommand,
	LocalRegisterCommand,
	NewPasswordCommand,
	ResendEmailCodeCommand,
	PasswordRecoveryCommand,
	PasswordRecoveryResendCommand
} from "./application/commands"
import { AuthService } from "./application/auth.service"
import { GoogleGuard } from "./guards-handlers/guards/google.guard"
import { IGoogleUser } from "./guards-handlers/strategies"
import { GooglePayloadDecorator, UserAgentDecorator } from "../../../../libs/common/decorators"
import { TokensEnum } from "../../../../libs/models/enums"
import { ConfigService } from "@nestjs/config"
import { ConfirmEmailCommand } from "./application/commands/confirm-email.command"
import { ConfirmPasswordRecoveryCommand } from "./application/commands/confirm-password-recovery.command"

type SetTokensToResponseType = {
	readonly tokens: TokensObjectType
	readonly res: Response
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
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
			userID: jwtPayload.userId
		}
		const tokens: TokensObjectType = await this.commandBus.execute(
			new LoginCommand(authObjectDTO)
		)

		return this.setTokensToResponse({ tokens, res })
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	@SwaggerToRefreshToken()
	@Get("refresh-token")
	async userRefreshToken(
		@JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res({ passthrough: true }) res: Response
	) {
		const authObjectDTO: AuthObjectType = {
			userIP,
			userAgent,
			userID: jwtPayload.userId
		}
		const tokens: TokensObjectType = await this.authService.refreshFlow(
			authObjectDTO,
			jwtPayload.userId,
			jwtPayload.sessionId
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
		await this.commandBus.execute(new LogoutCommand(jwtPayload.userId, jwtPayload.sessionId))

		response.clearCookie("refreshToken")
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAccessGuard)
	@SwaggerToMeInfo()
	@Get("me")
	async meInfo(@JwtPayloadDecorator() jwtPayload: JwtAccessPayload): Promise<MeInfoType> {
		return await this.commandBus.execute(new MeInfoCommand(jwtPayload.userId))
	}

	@Get("google")
	@UseGuards(GoogleGuard)
	async google() {}

	@Get("google/callback")
	@UseGuards(GoogleGuard)
	async googleCallback(
		@GooglePayloadDecorator() dto: IGoogleUser,
		@Ip() userIP: string,
		@UserAgentDecorator() userAgent: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: TokensObjectType = await this.authService.googleRegister(dto, {
			userIP,
			userAgent
		})
		return await this.setTokensToResponseGoogle({ tokens, res })
	}

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
	}: SetTokensToResponseType): Promise<any> {
		res.cookie(TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		})
		res.redirect(this.config.get<string>("GOOGLE_REDIRECT_URL"))
		return { accessToken: tokens.accessToken }
	}
}
