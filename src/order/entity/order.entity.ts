
export class Order {
  order_no: string;
  order_date: Date;
  priority: string;
  products: [{
    product_id: string;
    product_code: string;
    name: string;
    quantity: number;
    extra: number;
    price: number;
  }];
  store_id: string;
  store_code: string;
  store_name: string;
  store_name_en: string;
  store_level: string;
  promotion?: string;
  promotion_point?: number;
  pending_promotion_point?: number;
  pending_promotion_quantity?: number;
  address: string;
  phone: string;
  zone: string;
  location?: {
    type: string;
    coordinates: [number];
  };
  total_amount: number;
  discount_amount: number;
  paid_amount: number;
  remain_amount: number;
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
  order_status: string;
  trip_id: string;
  ship_trip_id: string;
  vehicle_code: string;
  driver_name: string;
  ship_date: Date;
  remark: string;
  picture: string;  
  signature_url: string; 
  
  ship_driver_name: string;
  ship_driver_id: string;
  ship_vehicle_code: string;
  ship_vehicle_id: string;
  create_by?: string;
  update_by?: string;
}
