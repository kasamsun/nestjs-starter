import { ApiProperty } from "@nestjs/swagger";

export class AdminDto { 
  
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password?: string;

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
    description: 'Status',
  })
  status: string;
}
