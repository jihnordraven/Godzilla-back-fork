import { HttpStatus } from '@nestjs/common';

export const authSwagger = {
  passwordRecovery204: {
    status: HttpStatus.NO_CONTENT,
    description:
      'A new activation code has been successfully sent to your email',
  },
  passwordRecovery400: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  newPassword204: {
    status: HttpStatus.NO_CONTENT,
    description: 'If code is valid and new password is accepted',
  },
  newPassword400: {
    status: HttpStatus.BAD_REQUEST,
    description:
      'If the inputModel has incorrect value (for incorrect password length) or ' +
      'RecoveryCode is incorrect or expired',
  },
};
