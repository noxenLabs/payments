import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WebpayPlusCommitResponseDto {
  @ApiProperty({ description: 'Código de autorización' })
  @IsString()
  @IsNotEmpty()
  authorizationCode: string;

  @ApiProperty({ description: 'Orden de compra' })
  @IsString()
  @IsNotEmpty()
  buyOrder: string;

  @ApiProperty({ description: 'ID de sesión' })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({ description: 'Monto' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Estado de la transacción' })
  @IsString()
  @IsNotEmpty()
  status: string;
}