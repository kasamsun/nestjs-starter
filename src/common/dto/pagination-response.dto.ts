import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseDto<T> {
  
  @ApiProperty({
    type: Array,
    description: 'List of data',
  })
  items: T[];
  
  @ApiProperty({
    type: Number,
    description: 'Total row found',
  })
  total_row: number;
  
  @ApiProperty({
    type: Number,
    description: 'Total page',
  })
  total_page: number;
  
  @ApiProperty({
    type: Number,
    description: 'Current page',
  })
  current_page: number;
}
