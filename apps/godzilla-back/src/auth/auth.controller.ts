import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { PassRecoveryDto } from './dto/passRecovery.dto';
import { CreateUserDto, NewPassUpdateDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      'A new activation code has been successfully sent to your email',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('password-recovery')
  async userCreateNewPass(@Body() email: PassRecoveryDto) {
    console.log(email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'If code is valid and new password is accepted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'If the inputModel has incorrect value (for incorrect password length) or RecoveryCode is incorrect or expired',
  })
  @Post('new-password')
  async userUpdateNewPass(@Body() newPassUpdateDto: NewPassUpdateDto) {
    console.log(newPassUpdateDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userAuthorization() {}

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async userRefreshToken() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration-confirmation')
  async userRegistrationConfirm() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      'Input data is accepted. Email with confirmation code will be send to passed email address',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'If the inputModel has incorrect values (in particular if the user with the given email or password already exists)',
  })
  @Post('registration')
  async userRegistration(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration-email-resending')
  async userRegistrationResending() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async userLogout() {}
}
