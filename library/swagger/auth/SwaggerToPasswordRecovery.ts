import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerToPasswordRecovery(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Send activation code to change password' }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description:
        'A new activation code has been successfully sent to your email',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
    }),
  );
}
