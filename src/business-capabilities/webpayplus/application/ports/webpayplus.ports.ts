import { WebpayPlusCreateDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.dto';
import { WebpayPlusCreateResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.response.dto';
import { WebpayPlusCommitDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.dto';
import { WebpayPlusCommitResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.response.dto';
import { WebpayPlusStatusDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.dto';
import { WebpayPlusStatusResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.response.dto';

export abstract class WebpayPlusPort {
  abstract create(
    payload: WebpayPlusCreateDto,
  ): Promise<WebpayPlusCreateResponseDto>;

  abstract commit(
    payload: WebpayPlusCommitDto,
  ): Promise<WebpayPlusCommitResponseDto>;

  abstract status(
    payload: WebpayPlusStatusDto,
  ): Promise<WebpayPlusStatusResponseDto>;
}