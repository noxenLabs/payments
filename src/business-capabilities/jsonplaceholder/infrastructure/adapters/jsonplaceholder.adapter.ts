import { JsonPlaceHolderPort } from '@business-capabilities/jsonplaceholder/application/ports/jsonplaceholder.ports';
import { JsonPlaceHolderRequestHeadersDTO } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-request.headers.dto';
import { JsonPlaceHolderResponseDto } from '@business-capabilities/jsonplaceholder/domain/dtos/jsonplaceholder-response.dto';
import { Injectable } from '@nestjs/common';
import { EnvValues } from '@shared/environment/config/env-values.config';
import { Constants } from '@shared/environment/constants';
import { ERROR, INFORMATION } from '@shared/environment/event-id.constants';
import { AxiosClient } from '@shared/modules/http/axios.client';
import HttpClientRequestDto, { Method, } from '@shared/modules/http/http.client.dto';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';
import { AxiosRequestConfig } from 'axios';

/**
 *  Adapter class for hanlding Http example operations.
 */

@Injectable()
export class JsonPlaceHolderAdapter implements JsonPlaceHolderPort {
  /**
   * Retrieve example information from the API
   * @param id - the identifier for the exmaple information.
   * @param headers - the headers for the HTTP Request.
   * @returns A promise that resolver to the HTTP example responde DTO.
   */
  constructor(
    private readonly httpClient: AxiosClient,
    private readonly logger: LoggerFactory,
  ) {}

  async getExampleInformation(
    paramId: string,
    requestHeaders: JsonPlaceHolderRequestHeadersDTO,
  ): Promise<JsonPlaceHolderResponseDto> {
    const context = JsonPlaceHolderAdapter.name;
    const configuration: AxiosRequestConfig = {
      headers: {
        'channel-id': requestHeaders.channelId,
        'transaction-id': requestHeaders.transactionId,
        // 'api-key-id': 'asdasd', // if you need to send autentication
        // 'api-key-secret': 'asdasd',// if you need to send autentication
        'Content-Type': Constants.DEFAULT_CONTENT_TYPE,
      },
      //repsonseType: 'arrayBuffer' //TODO: In case of considering the response of a file.
    };
    const requestHttp: HttpClientRequestDto = {
      url: `${EnvValues.get().JSON_PLACE_HOLDER_GET_URL}${paramId}`,
      conf: configuration,
    };
    try {
      this.logger.Information({
        message: 'Send request API',
        eventId: INFORMATION.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });
      const resp = await this.httpClient.executeHttpMethod(
        Method.Get,
        requestHttp,
      );
      return resp.data as JsonPlaceHolderResponseDto;
    } catch (error: unknown) {
      this.logger.Error({
        message: 'Call error: Api',
        payload: error,
        eventId: ERROR.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });
      throw error;
    }
  }
}
