import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CONFIG } from '../../../config/config';
import { JwtAccessPayload } from '../../../../../../library/helpers';

export const AccessCookieExtractor = function (req) {
  let token = null;

  if (req && req.cookies['refreshToken']) {
    token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }

  return token;
};

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: AccessCookieExtractor,
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any): Promise<JwtAccessPayload> {
    return { userId: payload.userId };
  }
}
