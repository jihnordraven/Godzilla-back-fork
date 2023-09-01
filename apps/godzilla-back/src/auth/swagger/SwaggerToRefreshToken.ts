import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerToRefreshToken(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Generation of a new pair of access and refresh tokens',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        'Returns JWT accessToken in body and JWT refreshToken ' +
        'in cookie (http-only, secure)',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description:
        'If the JWT refreshToken inside cookie is missing, expired or incorrect',
    }),
  );
}
