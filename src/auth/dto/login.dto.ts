import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  
  @ApiProperty({
    type: String,
    description: 'User name',
    required: true,
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    required: true,
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  password: string;
}
