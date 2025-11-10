import { Module } from '@nestjs/common';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';
import { WebpayPlusPort } from './application/ports/webpayplus.ports';
import { WebpayPlusService } from './application/services/webpayplus.service';
import { WebpayPlusAdapter } from './infrastructure/adapters/webpayplus.adapter';
import { WebpayPlusController } from './infrastructure/controller/webpayplus.controller';

@Module({
  controllers: [WebpayPlusController],
  providers: [
    WebpayPlusService,
    LoggerFactory,
    {
      provide: WebpayPlusPort,
      useClass: WebpayPlusAdapter,
    },
  ],
})
export class WebpayPlusModule {}