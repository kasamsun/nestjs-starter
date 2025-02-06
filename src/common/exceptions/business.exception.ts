import { I18nService } from 'nestjs-i18n';
import { BaseException } from './base.exception';

export class InactiveUserException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.inactive_user_exception'); }
}
export class InvalidCredentialException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.invalid_credential_exception'); }
}
export class InvalidTokenException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.invalid_token_exception'); }
}
export class RefreshTokenException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.refresh_token_exception'); }
}
export class DataNotFoundException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.data_not_found_exception'); }
}
export class DuplicateUsernameException extends BaseException {
  constructor(i18n: I18nService, username: string) { super(i18n, 'error.duplicate_username_exception', { username }); }
}
export class DeleteDataAuthorizeException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.delete_data_authorize_exception'); }
}
export class UnpaidOrderException extends BaseException {
  constructor(i18n: I18nService) { super(i18n, 'error.unpaid_order_exception'); }
}
export class DeleteMemberWithOrderException extends BaseException {
  constructor(i18n: I18nService, orderCount: number) { super(i18n, 'error.delete_member_with_order_exception', { orderCount }); }
}
export class DeleteProductWithOrderException extends BaseException {
  constructor(i18n: I18nService, orderCount: number) { super(i18n, 'error.delete_product_with_order_exception', { orderCount }); }
}


