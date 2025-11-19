import { WebpayPlusService } from '@business-capabilities/webpayplus/application/services/webpayplus.service';
import { WebpayPlusCreateDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.dto';
import { WebpayPlusCreateResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.response.dto';
import { WebpayPlusCommitDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.dto';
import { WebpayPlusCommitResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.response.dto';
import { WebpayPlusStatusDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.dto';
import { WebpayPlusStatusResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.response.dto';
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
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
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
    summary: 'Paso 1: Crear transacción Webpay Plus',
    description: `
**FLUJO DE PAGO - PASO 1 DE 3**

Este endpoint inicia el proceso de pago con Webpay Plus.

**¿Qué hace?**
- Crea una transacción en Transbank
- Retorna un token único y la URL de Webpay
- El token expira en 10 minutos

**¿Qué hacer con la respuesta?**
1. Guarda el token para después
2. Redirige al usuario a la URL recibida mediante un formulario POST
3. El usuario pagará en Webpay
4. Webpay redireccionará al usuario de vuelta a tu returnUrl con un token_ws

**Valores de prueba (Ambiente de Integración):**
- buyOrder: Puede ser cualquier string único (ej: "ORDER-123456")
- sessionId: Puede ser cualquier string único (ej: "SESSION-123456")
- amount: Monto en pesos chilenos (ej: 10000 = $10.000)
- returnUrl: URL donde Webpay redireccionará después del pago (debe ser accesible públicamente o usar ngrok en desarrollo)

**Ejemplo de returnUrl para desarrollo local:**
- Si usas ngrok: "https://tu-dominio.ngrok.io/api/resultado"
- En producción: "https://tudominio.com/api/resultado"

**Importante:** NO hagas commit inmediatamente después de crear la transacción. 
El commit solo se hace cuando Webpay redireccione de vuelta.`,
  })
  @ApiBody({
    type: WebpayPlusCreateDto,
    examples: {
      'Pago $10.000': {
        value: {
          buyOrder: 'ORDER-' + Date.now(),
          sessionId: 'SESSION-' + Date.now(),
          amount: 10000,
          returnUrl: 'https://tu-dominio.ngrok.io/resultado-pago',
        },
      },
      'Pago $50.000': {
        value: {
          buyOrder: 'ORDER-PROD-001',
          sessionId: 'SESSION-USER-12345',
          amount: 50000,
          returnUrl: 'https://tuapp.com/webpay/resultado',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Transacción creada exitosamente. Redirige al usuario a la URL proporcionada.',
    type: WebpayPlusCreateResponseDto,
    example: {
      token: 'e074d38c628122c63e5c0986368ece22974d6fee1440617d85873b7b4efa48a3',
      url: 'https://webpay3gint.transbank.cl/webpayserver/initTransaction',
    },
  })
  @ApiBadRequestResponse({ 
    type: BadRequestHttpExceptionDto,
    description: 'Datos inválidos. Verifica que amount sea numérico y returnUrl sea una URL válida.',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
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
    summary: 'Paso 2: Confirmar transacción Webpay Plus',
    description: `
**FLUJO DE PAGO - PASO 2 DE 3**

Este endpoint confirma el pago después de que el usuario pagó en Webpay.

**¿Cuándo usar este endpoint?**
- SOLO después de que Webpay redireccione al usuario de vuelta a tu returnUrl
- Webpay enviará un parámetro token_ws en la URL
- Usa ese token_ws para confirmar

**¿Qué hace?**
- Confirma la transacción con Transbank
- Retorna el resultado del pago (AUTHORIZED o FAILED)
- Solo se puede confirmar UNA vez por token

**Estados posibles:**
- AUTHORIZED: Pago aprobado ✅
- FAILED: Pago rechazado ❌

**Errores comunes:**
- Error 422 "Invalid status '0'": Estás intentando confirmar antes de que el usuario pague
- Error 404: El token no existe o expiró
- Error 422 "Transaction already committed": Ya confirmaste este token antes

**Importante:** Este endpoint SOLO funciona después de que el usuario completó el pago en Webpay.`,
  })
  @ApiBody({
    type: WebpayPlusCommitDto,
    examples: {
      'Confirmar transacción': {
        value: {
          token: 'e074d38c628122c63e5c0986368ece22974d6fee1440617d85873b7b4efa48a3',
        },
        description: 'Usa el token_ws que Webpay envió a tu returnUrl',
      },
    },
  })
  @ApiOkResponse({
    description: 'Transacción confirmada. Status puede ser AUTHORIZED (aprobado) o FAILED (rechazado).',
    type: WebpayPlusCommitResponseDto,
  })
  @ApiBadRequestResponse({ 
    type: BadRequestHttpExceptionDto,
    description: 'Token inválido o transacción no puede ser confirmada.',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
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

  @ApiOperation({
    summary: 'Paso 3 (Opcional): Consultar estado de transacción',
    description: `
**FLUJO DE PAGO - PASO 3 (OPCIONAL)**

Este endpoint consulta el estado detallado de una transacción.

**¿Cuándo usar este endpoint?**
- Para obtener información adicional de una transacción ya confirmada
- Para auditoría y reportes
- Para verificar detalles de pago (tarjeta, cuotas, fechas)

**Información adicional que retorna:**
- Tipo de pago (débito, crédito, cuotas)
- Últimos 4 dígitos de la tarjeta
- Número de cuotas
- Fechas de contabilización y transacción
- Código de respuesta del banco

**Nota:** Este endpoint puede usarse múltiples veces con el mismo token.`,
  })
  @ApiBody({
    type: WebpayPlusStatusDto,
    examples: {
      'Consultar estado': {
        value: {
          token: 'e074d38c628122c63e5c0986368ece22974d6fee1440617d85873b7b4efa48a3',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Estado completo de la transacción',
    type: WebpayPlusStatusResponseDto,
    example: {
      authorizationCode: '123456',
      buyOrder: 'ORDER-1234567890',
      sessionId: 'SESSION-1234567890',
      amount: 10000,
      status: 'AUTHORIZED',
      paymentTypeCode: 'VD',
      responseCode: 0,
      installmentsNumber: 0,
      accountingDate: '2024-11-19',
      transactionDate: '2024-11-19T14:30:00Z',
      cardNumber: '****6623',
    },
  })
  @ApiBadRequestResponse({ 
    type: BadRequestHttpExceptionDto,
    description: 'Token inválido.',
  })
  @ApiInternalServerErrorResponse({ type: GenericHttpExceptionDto })
  @ApiServiceUnavailableResponse({ type: ServiceUnavailableDto })
  @ApiBadGatewayResponse({ type: BadGatewayDto })
  @ApiUnauthorizedResponse({ type: UnathorizedHttpExceptionDto })
  @HttpCode(HttpStatus.OK)
  @Post('status')
  async status(
    @Body() payload: WebpayPlusStatusDto,
  ): Promise<WebpayPlusStatusResponseDto> {
    const context = WebpayPlusController.name;
    this.logger.Information({
      message: `Start ${context} status`,
      eventId: INFORMATION.JSON_PLACE_HOLDER_CONTROLLER,
      context,
    });
    return this.service.status(payload);
  }
}
