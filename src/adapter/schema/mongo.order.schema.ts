import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  order_no: string;
  @Prop()
  order_date: Date;
  @Prop()
  priority: string;
  @Prop()
  products: [{
    product_id: string;
    product_code: string;
    name: string;
    quantity: number;
    extra: number;
    price: number;
  }];
  @Prop()
  store_id: string;
  @Prop()
  store_code: string;
  @Prop()
  store_name: string;
  @Prop()
  store_name_en: string;
  @Prop()
  store_level: string;
  @Prop()
  promotion?: string;
  @Prop()
  promotion_point?: number;
  @Prop()
  pending_promotion_point?: number;
  @Prop()
  pending_promotion_quantity?: number;
  @Prop()
  address: string;
  @Prop()
  phone: string;
  @Prop()
  zone: string;
  @Prop({
    type: Object,
  })
  location?: {
    type: string;
    coordinates: [number];
  };
  @Prop()
  total_amount: number;
  @Prop()
  discount_amount: number;
  @Prop()
  paid_amount: number;
  @Prop()
  remain_amount: number;
  @Prop()
  payments: [{
    pay_date: Date;
    pay_type: string;
    pay_amount: number;
    bank_note_1000: number;
    bank_note_500: number;
    bank_note_100: number;
    bank_note_50: number;
    bank_note_20: number;
    coin_amount: number;
    ref1: string;
    ref2: string;
  }];
  @Prop()
  order_status: string;
  @Prop()
  trip_id: string;
  @Prop()
  ship_trip_id: string;
  @Prop()
  vehicle_code: string;
  @Prop()
  driver_name: string;
  @Prop()
  ship_date: Date;
  @Prop()
  remark: string;
  @Prop()
  picture: string;  
  @Prop()
  signature_url: string; 
  @Prop()  
  ship_driver_name: string;
  @Prop()
  ship_driver_id: string;
  @Prop()
  ship_vehicle_code: string;
  @Prop()
  ship_vehicle_id: string;
  @Prop()
  create_by?: string;
  @Prop()
  update_by?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('id').get(function() {
  return this._id.toHexString();
});