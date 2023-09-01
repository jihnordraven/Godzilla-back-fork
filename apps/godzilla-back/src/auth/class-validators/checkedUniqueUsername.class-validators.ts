import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/application/auth.service';

@ValidatorConstraint()
@Injectable()
export class CheckedUniqueUsername implements ValidatorConstraintInterface {
  constructor(protected authService: AuthService) {}

  async validate(value: string): Promise<boolean> {
    return await this.authService.checkedUniqueUsername(value);
  }

  defaultMessage() {
    return 'Username $value is already in use';
  }
}
