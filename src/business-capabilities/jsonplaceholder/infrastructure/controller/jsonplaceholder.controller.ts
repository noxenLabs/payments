import { JsonPlaceHolderService } from '@business-capabilities/jsonplaceholder/application/services/jsonplaceholder.service';
import { JsonPlaceHolderRequestHeadersModel } from '@business-capabilities/jsonplaceholder/domain/models/jsonplaceholder-request.headers.model';
import {
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiDocumentation } from '@shared/decorators/api.controller.decorator';
import { RequestHeaders } from '@shared/decorators/request-headers.decorator';
import { INFORMATION } from '@shared/environment/event-id.constants';
import {
  BadGatewayDto,
  BadRequestHttpExceptionDto,
  GenericHttpExceptionDto,
  NotFoundDto,
  ServiceUnavailableDto,
  UnathorizedHttpExceptionDto,
} from '@shared/interceptors/generic-http-exception.dto';
import { HttpExceptionFilter } from '@shared/interceptors/http.exception.filter';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';

@ApiDocumentation() 
@UseFilters(HttpExceptionFilter)
@ApiHeader({ name: 'channel-id', required: true })
@ApiHeader({ name: 'transaction-id', required: true })
export class JsonPlaceHolderController {
  constructor(
    private readonly jsonPlaceHolderService: JsonPlaceHolderService,
    private readonly logger: LoggerFactory,
  ) {}
  @ApiOperation({
    summary: 'Metodo de ejemplo HTTP Get',
    description:
      'Metodo encargado de conectarse via axios al api publica https://jsonplaceholder.typicode.com que entrega una estructura json de ejemplo',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
  @ApiBadRequestResponse({ type: BadRequestHttpExceptionDto })
  @ApiBadGatewayResponse({ type: BadGatewayDto })
  @ApiUnauthorizedResponse({ type: UnathorizedHttpExceptionDto })
  @ApiNotFoundResponse({ type: NotFoundDto })
  @ApiServiceUnavailableResponse({})
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async executeServices(
    @Param('id') id: string,
    @RequestHeaders(JsonPlaceHolderRequestHeadersModel)
    requestHeaders: JsonPlaceHolderRequestHeadersModel,
  ) {
    const context = JsonPlaceHolderController.name;
    this.logger.Information({
      message: `Start ${context} get/ method`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_CONTROLLER,
      context,
    });
    return await this.jsonPlaceHolderService.execute(id, requestHeaders);
  }
}
