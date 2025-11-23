import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WebpayPlusStatusDto {
  @ApiProperty({ 
    description: 'Token de la transacción',
    example: 'e074d38c628122c63e5c0986368ece22974d6fee1440617d85873b7b4efa48a3'
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

