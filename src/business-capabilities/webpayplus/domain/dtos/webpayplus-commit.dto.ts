import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WebpayPlusCommitDto {
  @ApiProperty({ description: 'Token devuelto por Webpay (token_ws)' })
  @IsString()
  @IsNotEmpty()
  token: string;
}