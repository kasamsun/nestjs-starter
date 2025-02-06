import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from 'nestjs-i18n';

export class RefreshTokenDto {

  @ApiProperty({
    type: String,
    description: 'Valid refresh token',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  refresh_token: string;
}
