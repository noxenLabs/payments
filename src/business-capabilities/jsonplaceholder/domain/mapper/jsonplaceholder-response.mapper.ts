import { Injectable } from '@nestjs/common';
import { JsonPlaceHolderResponseModel } from '@business-capabilities/jsonplaceholder/domain/models/jsonplaceholder-response.model';
import { JsonPlaceHolderMapperPort } from '@business-capabilities/jsonplaceholder/application/ports/jsonplaceholder-response.ports';
import { INFORMATION } from '@shared/environment/event-id.constants';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';
import { JsonPlaceHolderResponseDto } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-response.dto';

@Injectable()
export class JsonPlaceHolderResponseMapper
  implements JsonPlaceHolderMapperPort
{
  constructor(private readonly logger: LoggerFactory) {}
  mapApiResponse(
    responseApiBody: JsonPlaceHolderResponseDto,
  ): JsonPlaceHolderResponseModel {
    const context = JsonPlaceHolderResponseMapper.name;
    this.logger.Information({
      message: `Start ${context}`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_MAPPER_RESPONSE_API,
      context,
    });
    return {
      id: responseApiBody.id,
      summary: responseApiBody.title,
      description: responseApiBody.body,
    };
  }
}