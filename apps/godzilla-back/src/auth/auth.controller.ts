import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Headers,
	Ip,
	Param,
	ParseUUIDPipe,
	Post,
	Res,
	UseGuards,
	Query
} from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { Response } from 'express'
import { CreateUserDto, NewPassUpdateDto, PassRecoveryDto } from './core/dto'
import {
	LoginReqDto,
	SwaggerToAuthorization,
	SwaggerToLogout,
	SwaggerToNewPassword,
	SwaggerToPasswordEmailResending,
	SwaggerToPasswordRecovery,
	SwaggerToRefreshToken,
	SwaggerToRegistration,
	SwaggerToRegistrationEmailResending
} from 'library/swagger/auth'
import { JwtAccessPayload, JwtPayloadDecorator, mockToken } from 'library/helpers'
import { AuthObjectType, LoginResType, TokensObjectType } from './core/models'
import { LocalAuthGuard } from './guards-handlers/guards'
import {
	LocalRegisterCommand,
	LoginCommand,
	NewPasswordCommand,
	ResendEmailCodeCommand,
	PasswordRecoveryCommand,
	PasswordRecoveryResendCommand
} from './application/commands'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToRegistration()
	@Post('registration')
	async localRegister(@Body() createUser: CreateUserDto): Promise<void> {
		await this.commandBus.execute(new LocalRegisterCommand(createUser))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToRegistrationEmailResending()
	@Post('registration-email-resending')
	async userRegistrationResending(@Body() { email }: { email: string }): Promise<void> {
		await this.commandBus.execute(new ResendEmailCodeCommand({ email }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get('registration-confirmation')
	async userRegistrationConfirm(
		@Query('code', new ParseUUIDPipe()) code: string,
		@Res() res: Response
	) {}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordRecovery()
	@Post('password-recovery')
	async userCreateNewPass(@Body() { email }: PassRecoveryDto) {
		await this.commandBus.execute(new PasswordRecoveryCommand({ email }))
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToPasswordEmailResending()
	@Post('password-email-resending')
	async passwordEmailResending(@Body() { email }: { email: string }) {
		await this.commandBus.execute(new PasswordRecoveryResendCommand({ email }))
	}

	@HttpCode(HttpStatus.OK)
	@ApiExcludeEndpoint()
	@Get('new-password-confirmation/:codeActivate') //Срабатывает автоматически,
	// проверяет код активации, если он валиден перенаправляет на страницу new-password,
	// если не валиден отдается userId и пользователь перенаправляется
	// на страницу password-email-resending
	async newPasswordConfirm(@Param('codeActivate', new ParseUUIDPipe()) code: string) {
		console.log(code)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToNewPassword()
	@Post('new-password')
	async userUpdateNewPass(@Body() { newPassword, recoveryCode }: NewPassUpdateDto) {
		await this.commandBus.execute(
			new NewPasswordCommand({ recoveryCode, newPassword })
		)
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@SwaggerToAuthorization()
	@Post('login')
	async userAuthorization(
		@Body() body: LoginReqDto,
		@JwtPayloadDecorator()
		jwtPayload: JwtAccessPayload,
		@Ip() userIP: string,
		@Headers('user-agent') nameDevice: string,
		@Res({ passthrough: true }) response: Response
	): Promise<LoginResType> {
		const authObjectDTO: AuthObjectType = {
			ip: userIP,
			nameDevice: nameDevice,
			userID: jwtPayload.userId
		}

		const tokensObject: TokensObjectType = await this.commandBus.execute(
			new LoginCommand(authObjectDTO)
		)

		response.cookie('refreshToken', tokensObject.refreshToken, {
			httpOnly: true,
			secure: true
		})

		return {
			accessToken: tokensObject.accessToken
		}
	}

	@HttpCode(HttpStatus.OK)
	@SwaggerToRefreshToken()
	@Get('refresh-token')
	async userRefreshToken(
		// @JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
		@Ip() userIP: string,
		@Headers('user-agent') nameDevice: string,
		@Res({ passthrough: true }) response: Response
	) {
		console.log(userIP, nameDevice)

		response.cookie('refreshToken', mockToken, {
			httpOnly: true,
			secure: true
		})

		return {
			accessToken: mockToken
		}
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@SwaggerToLogout()
	@Post('logout')
	async userLogout(
		//@JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
		@Res({ passthrough: true }) response: Response
	) {
		await response.clearCookie('refreshToken')
	}
}
