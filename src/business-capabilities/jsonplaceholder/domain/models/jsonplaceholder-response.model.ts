import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JsonPlaceHolderResponseModel {
  @ApiProperty({
    description: 'id de registro',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'Resumen de registro',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  summary: string;
  @ApiProperty({
    description: 'Descripción del registro',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}



