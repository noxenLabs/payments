import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class WebpayPlusCreateDto {
  @ApiProperty({ description: 'Orden de compra', example: 'O-65431' })
  @IsString()
  @IsNotEmpty()
  buyOrder: string;

  @ApiProperty({ description: 'ID de sesión', example: 'S-47241' })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({ description: 'Monto', example: 1171 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'URL de retorno', example: 'https://your-app.com/webpay-plus/commit' })
  @IsUrl()
  @IsNotEmpty()
  returnUrl: string;
}