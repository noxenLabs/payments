import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebpayPlusModule } from '@business-capabilities/webpayplus/webpayplus-module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WebpayPlusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
