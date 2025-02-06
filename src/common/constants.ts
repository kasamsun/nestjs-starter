export class Constants {
  
  public static readonly ADMIN_STATUS_ACTIVE = 'active';
  public static readonly ADMIN_STATUS_INACTIVE = 'inactive';
  
  public static readonly MEMBER_STATUS_PENDING = 'pending';
  public static readonly MEMBER_STATUS_ACTIVE = 'active';
  
  public static readonly PRODUCT_STATUS_ACTIVE = 'active';
  public static readonly PRODUCT_STATUS_INACTIVE = 'inactive';

  public static readonly ORDER_STATUS_PENDING = 'pending';
  public static readonly ORDER_STATUS_PAID = 'paid';
  public static readonly ORDER_STATUS_SHIPPED = 'shipped';

  public static readonly PAYMENT_TYPE_QR = 'qr';
  public static readonly PAYMENT_STATUS_PENDING = 'pending';
  public static readonly PAYMENT_STATUS_COMPLETED = 'completed';

  public static readonly EVENT_ORDER_PAID = 'order-paid';
  public static readonly EVENT_ORDER_SHIPPED = 'order-shipped';
}