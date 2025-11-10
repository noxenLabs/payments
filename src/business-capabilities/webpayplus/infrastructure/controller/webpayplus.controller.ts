import { WebpayPlusService } from '@business-capabilities/webpayplus/application/services/webpayplus.service';
import { WebpayPlusCreateDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.dto';
import { WebpayPlusCreateResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.response.dto';
import { WebpayPlusCommitDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.dto';
import { WebpayPlusCommitResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.response.dto';
import {
  Body,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiDocumentation } from '@shared/decorators/api.controller.decorator';
import { INFORMATION } from '@shared/environment/event-id.constants';
import {
  BadGatewayDto,
  BadRequestHttpExceptionDto,
  GenericHttpExceptionDto,
  ServiceUnavailableDto,
  UnathorizedHttpExceptionDto,
} from '@shared/interceptors/generic-http-exception.dto';
import { HttpExceptionFilter } from '@shared/interceptors/http.exception.filter';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';

@ApiDocumentation()
@UseFilters(HttpExceptionFilter)
@ApiHeader({ name: 'channel-id', required: true })
@ApiHeader({ name: 'transaction-id', required: true })
export class WebpayPlusController {
  constructor(
    private readonly service: WebpayPlusService,
    private readonly logger: LoggerFactory,
  ) {}

  @ApiOperation({
    summary: 'Crear transacción Webpay Plus',
    description:
      'Crea una transacción y retorna token y URL para redirección al formulario de pago.',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
  @ApiBadRequestResponse({ type: BadRequestHttpExceptionDto })
  @ApiBadGatewayResponse({ type: BadGatewayDto })
  @ApiUnauthorizedResponse({ type: UnathorizedHttpExceptionDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(
    @Body() payload: WebpayPlusCreateDto,
  ): Promise<WebpayPlusCreateResponseDto> {
    const context = WebpayPlusController.name;
    this.logger.Information({
      message: `Start ${context} create`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_CONTROLLER,
      context,
    });
    return this.service.create(payload);
  }

  @ApiOperation({
    summary: 'Confirmar transacción Webpay Plus',
    description:
      'Confirma una transacción utilizando el token (token_ws) devuelto por Webpay.',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
  @ApiBadRequestResponse({ type: BadRequestHttpExceptionDto })
  @ApiBadGatewayResponse({ type: BadGatewayDto })
  @ApiUnauthorizedResponse({ type: UnathorizedHttpExceptionDto })
  @HttpCode(HttpStatus.OK)
  @Post('commit')
  async commit(
    @Body() payload: WebpayPlusCommitDto,
  ): Promise<WebpayPlusCommitResponseDto> {
    const context = WebpayPlusController.name;
    this.logger.Information({
      message: `Start ${context} commit`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_CONTROLLER,
      context,
    });
    return this.service.commit(payload);
  }
}