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
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import {
  CreateUserDto,
  EmailResendingDto,
  NewPassUpdateDto,
  PassRecoveryDto,
  PasswordEmailResendingDto,
} from './core/dto';
import {
  SwaggerToAuthorization,
  SwaggerToLogout,
  SwaggerToNewPassword,
  SwaggerToPasswordEmailResending,
  SwaggerToPasswordRecovery,
  SwaggerToRefreshToken,
  SwaggerToRegistration,
  SwaggerToRegistrationEmailResending,
} from '../../../../library/swagger/auth';
import {
  JwtAccessPayload,
  JwtPayloadDecorator,
  JwtRefreshPayload,
  mockToken,
} from '../../../../library/helpers';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToRegistration()
  @Post('registration')
  async userRegistration(@Body() createUser: CreateUserDto) {
    console.log(createUser.username, createUser.email, createUser.password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToRegistrationEmailResending()
  @Post('registration-email-resending')
  async userRegistrationResending(@Body() emailResending: EmailResendingDto) {
    console.log(emailResending);
  }

  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  @Get('registration-confirmation/:codeActivate') //Срабатывает автоматически,
  // проверяет код активации, если он валиден перенаправляет на страницу login
  // если не валиден отдается userId и пользователь перенаправляется
  // на страницу registration-email-resending
  async userRegistrationConfirm(
    @Param('codeActivate', new ParseUUIDPipe()) code: string,
  ) {
    console.log(code);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToPasswordRecovery()
  @Post('password-recovery')
  async userCreateNewPass(@Body() PassRecovery: PassRecoveryDto) {
    console.log(PassRecovery.email);
    console.log(PassRecovery.email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToPasswordEmailResending()
  @Post('password-email-resending')
  async passwordEmailResending(
    @Body() passwordEmailResending: PasswordEmailResendingDto,
  ) {
    console.log(passwordEmailResending);
  }

  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  @Get('new-password-confirmation/:codeActivate') //Срабатывает автоматически,
  // проверяет код активации, если он валиден перенаправляет на страницу new-password,
  // если не валиден отдается userId и пользователь перенаправляется
  // на страницу password-email-resending
  async newPasswordConfirm(
    @Param('codeActivate', new ParseUUIDPipe()) code: string,
  ) {
    console.log(code);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToNewPassword()
  @Post('new-password')
  async userUpdateNewPass(@Body() newPassUpdate: NewPassUpdateDto) {
    console.log(newPassUpdate);
  }

  @HttpCode(HttpStatus.OK)
  @SwaggerToAuthorization()
  @Post('login')
  async userAuthorization(
    //@JwtPayloadDecorator() jwtPayload: JwtAccessPayload,
    @Ip() userIP: string,
    @Headers('user-agent') nameDevice: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(userIP, nameDevice);

    response.cookie('refreshToken', mockToken, {
      httpOnly: true,
      secure: true,
    });

    return {
      accessToken: mockToken,
      user: {
        userId: 'f57aeded-6aac-4c7d-b298-1b7e4078184c',
        username: 'ValeraGolova',
        email: 'valeraGolova@gmail.com',
        createdAt: new Date().toISOString(),
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @SwaggerToRefreshToken()
  @Get('refresh-token')
  async userRefreshToken(
    // @JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
    @Ip() userIP: string,
    @Headers('user-agent') nameDevice: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(userIP, nameDevice);

    response.cookie('refreshToken', mockToken, {
      httpOnly: true,
      secure: true,
    });

    return {
      accessToken: mockToken,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToLogout()
  @Post('logout')
  async userLogout(
    //@JwtPayloadDecorator() jwtPayload: JwtRefreshPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    await response.clearCookie('refreshToken');
  }
}
