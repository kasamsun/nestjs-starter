import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AdapterModule } from '../adapter/adapter.module';

@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
