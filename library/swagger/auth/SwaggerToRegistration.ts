import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SwaggerToRegistration(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'User registration' }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description:
        'Input data is accepted. Email with confirmation code will be send to ' +
        'passed email address',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description:
        'If the inputModel has incorrect values (in particular if the user with ' +
        'the given email or password already exists)',
    }),
  );
}
