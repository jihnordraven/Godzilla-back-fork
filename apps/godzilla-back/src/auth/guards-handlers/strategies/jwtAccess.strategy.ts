import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CONFIG } from '../../../config/config';
import { JwtAccessPayload } from '../../../../../../library/helpers';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: CONFIG.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any): Promise<JwtAccessPayload> {
    console.log(payload);
    return payload;
  }
}
