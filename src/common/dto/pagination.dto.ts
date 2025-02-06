import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { i18nValidationMessage } from 'nestjs-i18n';

export class PaginationDto {
  
  @ApiProperty({
    type: Number,
    description: 'Page number to be retrieved',
  })
  @IsInt({ message: i18nValidationMessage('validation.IS_INTEGER') })
  @Type(() => Number)
  page: number;
  
  @ApiProperty({
    type: Number,
    description: 'Page size, Number of rows per page',
  })
  @IsInt({ message: i18nValidationMessage('validation.IS_INTEGER') })
  @Type(() => Number)
  size: number;
  
  @ApiProperty({
    type: String,
    description: 'Sort column name',
  })
  sort_by: string;
  
  @ApiProperty({
    type: String,
    description: 'Order direction 0,1',
  })
  @IsInt({ message: i18nValidationMessage('validation.IS_INTEGER') })
  @Type(() => Number)
  direction: number;
  
  @ApiProperty({
    type: String,
    description: 'Search',
  })
  search: string;
}
