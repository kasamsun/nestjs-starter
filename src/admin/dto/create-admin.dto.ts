import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateAdminDto { 
  
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  password?: string;

  @ApiProperty({
    type: String,
    description: 'Full name',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  full_name: string;

  @ApiProperty({
    type: String,
    description: 'Role',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  role: string;

  @ApiProperty({
    type: String,
    description: 'Status',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  status: string;
}
