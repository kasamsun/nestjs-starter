import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { fileMimetypeFilter } from "../filters/file-mimetype.filter";

export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
  fileSize: number = 1*1024*1024, // default 1Mb.
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
    limits: {
      fileSize: fileSize,
    }
  });
}