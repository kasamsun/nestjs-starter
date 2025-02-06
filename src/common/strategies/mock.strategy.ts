
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  sign(payload: any) {
    return '-----valid-token-----';
  }

  decode(refreshToken: any) {
    return {
      username: 'member1',
      admin_id: 1,
      roles: ['member'],
    };
  }
  
  async validate(payload: any) {
    return {
      username: payload.username,
      admin_id: payload.admin_id,
      roles: payload.roles,
    };
  }
}
