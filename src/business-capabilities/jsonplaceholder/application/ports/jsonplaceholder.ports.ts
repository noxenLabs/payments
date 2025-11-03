import { JsonPlaceHolderRequestHeadersDTO } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-request.headers.dto';
import { JsonPlaceHolderResponseDto } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-response.dto';

export abstract class JsonPlaceHolderPort {
  abstract getExampleInformation(
    id: string,
    headers: JsonPlaceHolderRequestHeadersDTO,
  ): Promise<JsonPlaceHolderResponseDto>;
}
