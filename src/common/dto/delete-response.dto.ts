import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponseDto {
    
  @ApiProperty({
    type: Number,
    description: 'Total row to delete',
  })
  affected: number;
}
