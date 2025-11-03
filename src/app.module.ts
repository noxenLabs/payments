import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JsonPlaceHolderModule } from '@business-capabilities/jsonplaceholder/jsonplaceholder-module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JsonPlaceHolderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
