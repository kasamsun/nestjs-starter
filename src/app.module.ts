import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdapterModule } from './adapter/adapter.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { ResponseMiddleware } from './middleware/response.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    CacheModule.register({
      ttl: 30*1000,
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'th',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(["lang", "l"]),
        new HeaderResolver(["x-lang"]),
      ],
    }),
    AuthModule,
    AdapterModule,
    AdminModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*') // Apply the middleware to all routes
  }
}
