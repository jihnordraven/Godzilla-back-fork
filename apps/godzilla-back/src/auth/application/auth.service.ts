import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(protected authRepository: AuthRepository) {}

  async checkedEmailToBase(email: string): Promise<boolean> {
    console.log(email);
    return false;
  }

  async checkedConfirmCode(code: string): Promise<boolean> {
    console.log(code);
    return false;
  }

  async checkedUniqueUsername(userName: string): Promise<boolean> {
    console.log(userName);
    return false;
  }

  async checkedUniqueEmail(email: string): Promise<boolean> {
    console.log(email);
    return false;
  }
}
