import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { IDatabaseAdapter } from '../adapter/interface/database.interface';
import { MockDatabaseAdapter } from '../adapter/implement/mock.database.adapter';
import { MockStrategy } from '../common/strategies/mock.strategy';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { InvalidCredentialException, InvalidTokenException, RefreshTokenException } from '../common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

describe('Auth', () => {
  let controller: AuthController;
  let jwtService: JwtService;
  const loginUser = {
    user: {
      username: 'member1',
      member_id: '1',
      roles: ['member'],
    }
  };

  beforeAll(async () => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.tz.setDefault("Asia/Bangkok")
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ConfigService, {
        provide: JwtService,
        useClass: MockStrategy,
      }, {
        provide: IDatabaseAdapter,
        useClass: MockDatabaseAdapter,
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Auth Controller', () => {

    it('can login using valid username and password', async () => {
      const result = await controller.login({
        username: "member1",
        password: "1234"
      })
      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(result.refresh_token).toBeDefined();
    });

    it('can not login using invalid username', async () => {
      await expect(controller.login({
        username: "memberx",
        password: "1234"
      })).rejects.toThrowError(InvalidCredentialException)
    });

    it('can not login using invalid password', async () => {
      await expect(controller.login({
        username: "member1",
        password: "9999"
      })).rejects.toThrowError(InvalidCredentialException)
    });

    it('can refresh token', async () => {
      const result = await controller.refreshToken({
        refresh_token: "-----valid-token-----",
      })
      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(result.refresh_token).toBeDefined();
    });

    it('can not refresh token using invalid refresh token', async () => {
      jest.spyOn(jwtService, 'decode').mockImplementation(() => undefined);

      await expect(controller.refreshToken({
        refresh_token: "*****invalid-token*****",
      })).rejects.toThrowError(InvalidTokenException)
      
    });

    it('can not refresh token using other user refresh token', async () => {
      jest.spyOn(jwtService, 'decode').mockImplementation(() => ({
        username: 'memberx',
        member_id: 999,
        roles: [],
      }));

      await expect(controller.refreshToken({
        refresh_token: "-----valid-token-----",
      })).rejects.toThrowError(InvalidTokenException)
      
    });

    it('can not refresh token using invalid refresh token', async () => {
      jest.spyOn(jwtService, 'decode').mockImplementation(() => ({
        username: 'member1',
        member_id: 1,
        roles: [],
      }));

      await expect(controller.refreshToken({
        refresh_token: "*****invalid-token*****",
      })).rejects.toThrowError(RefreshTokenException)
      
    });

    // it('can logout', async () => {
    //   await controller.logout(loginUser)
    // });

    // it('can not logout using invalid user', async () => {
    //   await expect(controller.logout({
    //     user: {
    //       username: "memberx",
    //       member_id: 999,
    //       roles: ['member'],
    //     }
    //   })).rejects.toThrowError(InvalidTokenException)
    // });
  });
});
