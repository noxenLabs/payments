import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class WebpayPlusCreateResponseDto {
  @ApiProperty({ description: 'Token de transacción' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'URL de formulario de pago' })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}