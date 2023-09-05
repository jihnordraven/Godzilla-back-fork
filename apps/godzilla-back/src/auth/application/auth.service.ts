import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { SessionsBaseType, UserBaseType } from '../../../../../library/models';
import { BcryptAdapter } from '../adapters/bcrypt.adapter';
import { JwtAccessPayload } from '../../../../../library/helpers';

@Injectable()
export class AuthService {
  constructor(
    protected authRepository: AuthRepository,
    protected bcrypt: BcryptAdapter,
  ) {}

  async validateLogin(
    email: string,
    password: string,
  ): Promise<JwtAccessPayload | null> {
    const user: UserBaseType | null =
      await this.authRepository.findUserToEmail(email);

    if (!user || user.isBanned === true) {
      return null;
    }

    const validatePassword: boolean = await this.bcrypt.hushCompare(
      password,
      user.hushPass,
    );

    if (!validatePassword) {
      return null;
    }

    return { userId: user.id };
  }

  async checkedActiveSession(
    sessionId: string,
    expiredSecondsToken: number,
  ): Promise<boolean> {
    if (!sessionId) {
      return false;
    }

    const activeSession: SessionsBaseType | null =
      await this.authRepository.findActiveSession(sessionId);

    if (!activeSession) {
      return false;
    }

    const lastActiveToSecond = Number(
      Date.parse(activeSession.sessionExpired).toString().slice(0, 10),
    );

    if (expiredSecondsToken - lastActiveToSecond > 2) {
      return false;
    }

    return true;
  }

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
