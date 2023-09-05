import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { RefreshCookieExtractor } from '../../../../../../library/helpers';
import { CONFIG } from '../../../config/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(protected authService: AuthService) {
    super({
      jwtFromRequest: RefreshCookieExtractor,
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    const validateSession: boolean =
      await this.authService.checkedActiveSession(
        payload.sessionId,
        payload.iat,
      );

    if (!validateSession) {
      throw new UnauthorizedException('Session expired');
    }
    return { userId: payload.userId, sessionId: payload.sessionId };
  }
}
