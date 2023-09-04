import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginResType } from '../../../apps/godzilla-back/src/auth/core/models';

type LoginReqType = {
  email: string;
  password: string;
};

export class LoginReqDto implements LoginReqType {
  @ApiProperty({
    description: 'User email',
    type: String,
    pattern: '^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$',
    nullable: false,
  })
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    minLength: 6,
    maxLength: 20,
    pattern:
      '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]+$',
    nullable: false,
  })
  readonly password: string;
}

class LoginResDto implements LoginResType {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;
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
