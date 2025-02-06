import { ApiProperty } from "@nestjs/swagger";
export class LoginResponseDto {
  
  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  access_token: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token',
  })
  refresh_token: string;
}
