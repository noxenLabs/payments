import { Injectable } from '@nestjs/common';
import { INFORMATION } from '@shared/environment/event-id.constants';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';
import { WebpayPlusPort } from '@business-capabilities/webpayplus/application/ports/webpayplus.ports';
import { WebpayPlusCreateDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.dto';
import { WebpayPlusCreateResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.response.dto';
import { WebpayPlusCommitDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.dto';
import { WebpayPlusCommitResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.response.dto';
import { WebpayPlusStatusDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.dto';
import { WebpayPlusStatusResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.response.dto';

@Injectable()
export class WebpayPlusService {
  constructor(
    private readonly logger: LoggerFactory,
    private readonly adapter: WebpayPlusPort,
  ) {}

  async create(
    payload: WebpayPlusCreateDto,
  ): Promise<WebpayPlusCreateResponseDto> {
    const context = WebpayPlusService.name;
    this.logger.Information({
      message: `Start ${context} create`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_SERVICE,
      context,
    });
    return this.adapter.create(payload);
  }

  async commit(
    payload: WebpayPlusCommitDto,
  ): Promise<WebpayPlusCommitResponseDto> {
    const context = WebpayPlusService.name;
    this.logger.Information({
      message: `Start ${context} commit`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_SERVICE,
      context,
    });
    return this.adapter.commit(payload);
  }

  async status(
    payload: WebpayPlusStatusDto,
  ): Promise<WebpayPlusStatusResponseDto> {
    const context = WebpayPlusService.name;
    this.logger.Information({
      message: `Start ${context} status`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_SERVICE,
      context,
    });
    return this.adapter.status(payload);
  }
}