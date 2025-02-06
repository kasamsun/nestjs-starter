import { BadRequestException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

export class BaseException extends BadRequestException {
  constructor(i18n: I18nService, messagePath: string, arg?: Object) {
    super(i18n.t(messagePath, { lang: I18nContext.current().lang, args: arg }))
  }
}
