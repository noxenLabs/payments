import { Module } from '@nestjs/common';
import { AxiosClient } from '../../shared/modules/http/axios.client';
import { LoggerFactory } from '../../shared/modules/logger/logger-factory';
import { JsonPlaceHolderMapperPort } from './application/ports/jsonplaceholder-response.ports';
import { JsonPlaceHolderPort } from './application/ports/jsonplaceholder.ports';
import { JsonPlaceHolderService } from './application/services/jsonplaceholder.service';
import { JsonPlaceHolderResponseMapper } from './domain/mapper/jsonplaceholder-response.mapper';
import { JsonPlaceHolderAdapter } from './infrastructure/adapters/jsonplaceholder.adapter';
import { JsonPlaceHolderController } from './infrastructure/controller/jsonplaceholder.controller';

@Module({
  controllers: [JsonPlaceHolderController],
  providers: [
    JsonPlaceHolderService,
    LoggerFactory,
    AxiosClient,
    {
      provide: JsonPlaceHolderPort,
      useClass: JsonPlaceHolderAdapter,
    },
    {
      provide: JsonPlaceHolderMapperPort,
      useClass: JsonPlaceHolderResponseMapper,
    },
  ],
})
export class JsonPlaceHolderModule {}
