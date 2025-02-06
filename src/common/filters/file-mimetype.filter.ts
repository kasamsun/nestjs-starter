import { UnsupportedMediaTypeException } from '@nestjs/common';
import { i18nValidationMessage } from 'nestjs-i18n';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `${i18nValidationMessage('validation.FILE_TYPE')} [${mimetypes.join(', ')}]`,
        ),
        false,
      );
    }
  };
}
