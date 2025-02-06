import { Injectable } from '@nestjs/common';
import { IDatabaseAdapter } from '../adapter/interface/database.interface';
import { I18nService } from 'nestjs-i18n';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly i18n: I18nService,
    private readonly databaseAdapter: IDatabaseAdapter,
  ) {}

  async getOrderList(pagination: PaginationDto):Promise<PaginationResponseDto<OrderResponseDto>> {
    const result = await this.databaseAdapter.findOrder(pagination);

    return {
      total_page: result.total_page,
      total_row: result.total_row,
      current_page: result.current_page,
      items: result.items.map(item=>({        
        order_no: item.order_no,
        order_date: item.order_date,
        priority: item.priority,
        products: item.products,
        store_id: item.store_id,
        store_code: item.store_code,
        store_name: item.store_name,
        store_name_en: item.store_name_en,
        store_level: item.store_level,
        address: item.address,
        phone: item.phone,
        zone: item.zone,
        location: item.location,
        total_amount: item.total_amount,
        discount_amount: item.discount_amount,
        paid_amount: item.paid_amount,
        remain_amount: item.remain_amount,
        payments: item.payments,
        order_status: item.order_status,
        trip_id: item.trip_id,
        ship_trip_id: item.ship_trip_id,
        vehicle_code: item.vehicle_code,
        driver_name: item.driver_name,
        ship_date: item.ship_date,
        remark: item.remark,
        picture: item.picture,
        signature_url: item.signature_url, 
        ship_driver_name: item.ship_driver_name,
        ship_driver_id: item.ship_driver_id,
        ship_vehicle_code: item.ship_vehicle_code,
        ship_vehicle_id: item.ship_vehicle_id,
      }))
    };
  }

}
