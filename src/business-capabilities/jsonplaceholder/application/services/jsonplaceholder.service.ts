import { Injectable } from '@nestjs/common';
import { JsonPlaceHolderRequestHeadersModel } from '@business-capabilities/jsonplaceholder/domain/models/jsonplaceholder-request.headers.model';
import { JsonPlaceHolderPort } from '@business-capabilities/jsonplaceholder/application/ports/jsonplaceholder.ports';
import { JsonPlaceHolderMapperPort } from '@business-capabilities/jsonplaceholder/application/ports/jsonplaceholder-response.ports';
import { JsonPlaceHolderResponseModel } from '@business-capabilities/jsonplaceholder/domain/models/jsonplaceholder-response.model';
import { INFORMATION } from '@shared/environment/event-id.constants';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';

@Injectable()
export class JsonPlaceHolderService {
  constructor(
    private readonly logger: LoggerFactory,
    private readonly httpExampleAdapter: JsonPlaceHolderPort,
    private readonly mapResponseModel: JsonPlaceHolderMapperPort,
  ) {}

  async execute(
    id: string,
    requestHeaders: JsonPlaceHolderRequestHeadersModel,
  ): Promise<JsonPlaceHolderResponseModel> {
    const context = JsonPlaceHolderService.name;
    this.logger.Information({
      message: `Start ${context}`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_SERVICE,
      context,
    });

    const response = await this.httpExampleAdapter.getExampleInformation(
      id,
      requestHeaders,
    );
    return Promise.resolve(this.mapResponseModel.mapApiResponse(response));
  }
}
