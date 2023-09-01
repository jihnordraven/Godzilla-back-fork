import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto, NewPassUpdateDto, PassRecoveryDto } from './core/dto';
import {
  SwaggerToAuthorization,
  SwaggerToLogout,
  SwaggerToNewPassword,
  SwaggerToPasswordEmailResending,
  SwaggerToPasswordRecovery,
  SwaggerToRefreshToken,
  SwaggerToRegistration,
  SwaggerToRegistrationEmailResending,
} from './swagger';
import { EmailResendingDto } from './core/dto/passRecover222y.dto';

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiExcludeEndpoint()
  @Get('registration-confirmation/:codeActivate') //Срабатывает автоматически,
  // проверяет код активации, если он валиден перенаправляет на страницу Логинизации
  // если не валиден отдается userId и пользователь перенаправляется
  // на страницу Отправить код активации ещё раз
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
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToPasswordEmailResending()
  @Post('password-email-resending')
  async passwordEmailResending() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiExcludeEndpoint()
  @Get('new-password-confirmation') //Срабатывает автоматически,
  // проверяет код активации, если он валиден перенаправляет на страницу ввода
  // нового пароля, если не валиден отдается userId и пользователь перенаправляется
  // на страницу Отправить код активации ещё раз
  async newPasswordConfirm() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToNewPassword()
  @Post('new-password')
  async userUpdateNewPass(@Body() newPassUpdate: NewPassUpdateDto) {
    console.log(newPassUpdate);
  }

  @HttpCode(HttpStatus.OK)
  @SwaggerToAuthorization()
  @Post('login')
  async userAuthorization() {}

  @HttpCode(HttpStatus.OK)
  @SwaggerToRefreshToken()
  @Get('refresh-token')
  async userRefreshToken() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerToLogout()
  @Post('logout')
  async userLogout() {}
}
