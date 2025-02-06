import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IDatabaseAdapter } from './interface/database.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseAdapter } from './implement/mongo.database.adapter';
import { Admin, AdminSchema } from './schema/mongo.admin.schema';
import { Order, OrderSchema } from './schema/mongo.order.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema, collection: 'admins' },
      { name: Order.name, schema: OrderSchema, collection: 'orders' },
    ]),
  ],
  providers: [{
    provide: IDatabaseAdapter,
    useClass: MongoDatabaseAdapter,
  }],
  exports: [IDatabaseAdapter]
})

export class AdapterModule {}
