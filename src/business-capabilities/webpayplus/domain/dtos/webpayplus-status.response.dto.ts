import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class WebpayPlusStatusResponseDto {
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

  @ApiProperty({ description: 'Monto de la transacción' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Estado de la transacción' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Tipo de pago' })
  @IsString()
  @IsOptional()
  paymentTypeCode?: string;

  @ApiProperty({ description: 'Código de respuesta' })
  @IsNumber()
  @IsOptional()
  responseCode?: number;

  @ApiProperty({ description: 'Número de cuotas' })
  @IsNumber()
  @IsOptional()
  installmentsNumber?: number;

  @ApiProperty({ description: 'Fecha de contabilización' })
  @IsString()
  @IsOptional()
  accountingDate?: string;

  @ApiProperty({ description: 'Fecha de la transacción' })
  @IsString()
  @IsOptional()
  transactionDate?: string;

  @ApiProperty({ description: 'Últimos 4 dígitos de la tarjeta' })
  @IsString()
  @IsOptional()
  cardNumber?: string;
}

