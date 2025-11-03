import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class JsonPlaceHolderRequestHeadersModel {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'channel-id' })
  channelId: string;
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'transaction-id' })
  transactionId: string;
}
