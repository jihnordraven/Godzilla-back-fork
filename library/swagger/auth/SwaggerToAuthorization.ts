import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerToAuthorization(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'User authorization' }),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        'Returns JWT accessToken in body and JWT refreshToken ' +
        'in cookie (http-only, secure)',
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
