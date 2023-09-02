import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginResType } from '../../../apps/godzilla-back/src/auth/core/models';

class UserInfoDto {
  @ApiProperty({
    description: 'User id',
  })
  userId: string;

  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    description: 'Creation date',
  })
  createdAt: string;
}

class LoginResDto implements LoginResType {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User info',
  })
  user: UserInfoDto;
}
export function SwaggerToAuthorization(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'User authorization' }),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        'Returns JWT accessToken in body and JWT refreshToken ' +
        'in cookie (http-only, secure)',
      type: LoginResDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'If the inputModel has incorrect values',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'If the password or login is wrong',
    }),
  );
}
