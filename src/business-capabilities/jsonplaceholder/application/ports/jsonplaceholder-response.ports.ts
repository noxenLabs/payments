import { JsonPlaceHolderResponseDto } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-response.dto';
import { JsonPlaceHolderResponseModel } from '@business-capabilities/jsonplaceholder/domain/models/jsonplaceholder-response.model';

export abstract class JsonPlaceHolderMapperPort {
  abstract mapApiResponse(
    responseApiBody: JsonPlaceHolderResponseDto,
  ): JsonPlaceHolderResponseModel;
}
