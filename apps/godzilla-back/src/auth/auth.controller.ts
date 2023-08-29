import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password-recovery')
  async userCreateNewPass() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('new-password')
  async userUpdateNewPass() {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userAuthorization() {
    return { code: 200 };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async userRefreshToken() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration-confirmation')
  async userRegistrationConfirm() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration')
  async userRegistration() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration-email-resending')
  async userRegistrationResending() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async userLogout() {}
}
