import { ApiProperty } from "@nestjs/swagger";

export class AdminResponseDto {
  
  @ApiProperty({
    type: String,
    description: 'Admin ID',
  })
  id: string;
  
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  username: string;
  
  @ApiProperty({
    type: String,
    description: 'Full name',
  })
  full_name: string;

  @ApiProperty({
    type: String,
    description: 'Role',
  })
  role: string;
  
  @ApiProperty({
    type: String,
    description: 'Status (pending, active)',
  })
  status?: string;

  @ApiProperty({
    type: Date,
    description: 'Last login date',
  })
  last_login_date?: Date;
}
