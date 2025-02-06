import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.strategy'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdapterModule } from '../adapter/adapter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }),
    AdapterModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService,],
})
export class AuthModule {}
