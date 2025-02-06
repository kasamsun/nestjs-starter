import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import { IDatabaseAdapter } from '../adapter/interface/database.interface';
import { InactiveUserException, InvalidCredentialException, InvalidTokenException, RefreshTokenException } from '../common/exceptions/business.exception';
import * as dayjs from 'dayjs';
import { Role } from './entity/role.enum';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { Constants } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly i18n: I18nService,
    private readonly configService: ConfigService,
    private readonly databaseAdapter: IDatabaseAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string):Promise<LoginResponseDto> {

    const admin = await this.databaseAdapter.findAdminByUsername(username)

    if (admin) {
      if (admin.status==Constants.ADMIN_STATUS_INACTIVE) {
        throw new InactiveUserException(this.i18n);
      }
      if (bcrypt.compareSync(password, admin.password) !== true) {
        throw new InvalidCredentialException(this.i18n);
      }
    } else {
      throw new InvalidCredentialException(this.i18n);
    }

    let payload = {
      username: admin.username,
      admin_id: admin.id,
      roles: [admin.role],
    }
    
    const result = {      
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }),
      admin: {        
        username: admin.username,
        full_name: admin.full_name,
        role: admin.role,
        status: admin.status,
        last_login_date: admin.last_login_date,
      }
    };

    admin.refresh_token = bcrypt.hashSync(result.refresh_token, 10);
    admin.last_login_date = new Date();

    await this.databaseAdapter.updateAdmin(admin.id, admin);

    return result;
  }

  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {

    const jwtPayload: any = this.jwtService.decode(refreshToken);
    if (!jwtPayload) {
      throw new InvalidTokenException(this.i18n);
    }

    if (jwtPayload.exp < dayjs().unix()) {
      throw new RefreshTokenException(this.i18n);      
    }

    const admin = await this.databaseAdapter.findAdminByUsername(jwtPayload.username)
    if (!admin) {
      throw new InvalidTokenException(this.i18n)
    }
    
    if (bcrypt.compareSync(refreshToken, admin.refresh_token) !== true) {
      throw new RefreshTokenException(this.i18n)
    }
    
    const payload = {
      username: admin.username,
      admin_id: admin.id,
      roles: [admin.role],
    }

    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    admin.refresh_token = bcrypt.hashSync(newRefreshToken, 10);

    await this.databaseAdapter.updateAdmin(admin.id, admin);
    
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
    }
  }

  async logout(refreshToken: string) {

    const jwtPayload: any = this.jwtService.decode(refreshToken);
    if (!jwtPayload) {
      return
    }

    const admin = await this.databaseAdapter.findAdminByUsername(jwtPayload.username)
    if (!admin) {
      throw new InvalidTokenException(this.i18n)
    }

    admin.refresh_token = null;

    await this.databaseAdapter.updateAdmin(admin.id, admin);
    
    // TODO: No revoke token, client must clean up their access token by themself
  }
}
