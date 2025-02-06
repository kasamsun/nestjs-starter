import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdapterModule } from '../adapter/adapter.module';

@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
