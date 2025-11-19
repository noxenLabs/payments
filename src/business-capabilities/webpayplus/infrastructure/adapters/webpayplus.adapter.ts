import { Injectable } from '@nestjs/common';
import { LoggerFactory } from '@shared/modules/logger/logger-factory';
import { ERROR, INFORMATION } from '@shared/environment/event-id.constants';
import { WebpayPlusPort } from '@business-capabilities/webpayplus/application/ports/webpayplus.ports';
import { WebpayPlusCreateDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.dto';
import { WebpayPlusCreateResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-create.response.dto';
import { WebpayPlusCommitDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.dto';
import { WebpayPlusCommitResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-commit.response.dto';
import { WebpayPlusStatusDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.dto';
import { WebpayPlusStatusResponseDto } from '@business-capabilities/webpayplus/domain/dtos/webpayplus-status.response.dto';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';

@Injectable()
export class WebpayPlusAdapter implements WebpayPlusPort {
  constructor(private readonly logger: LoggerFactory) {}

  async create(
    payload: WebpayPlusCreateDto,
  ): Promise<WebpayPlusCreateResponseDto> {
    const context = WebpayPlusAdapter.name;
    try {
      this.logger.Information({
        message: 'Creating Webpay Plus transaction',
        eventId: INFORMATION.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });

      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration,
        ),
      );

      const response = await tx.create(
        payload.buyOrder,
        payload.sessionId,
        payload.amount,
        payload.returnUrl,
      );

      return {
        token: response.token,
        url: response.url,
      };
    } catch (error) {
      this.logger.Error({
        message: 'Error creating transaction',
        payload: error,
        eventId: ERROR.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });
      throw error;
    }
  }

  async commit(
    payload: WebpayPlusCommitDto,
  ): Promise<WebpayPlusCommitResponseDto> {
    const context = WebpayPlusAdapter.name;
    try {
      this.logger.Information({
        message: 'Committing Webpay Plus transaction',
        eventId: INFORMATION.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });

      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration,
        ),
      );

      const commitResponse = await tx.commit(payload.token);

      return {
        authorizationCode: commitResponse.authorization_code,
        buyOrder: commitResponse.buy_order,
        sessionId: commitResponse.session_id,
        amount: commitResponse.amount,
        status: commitResponse.status,
      };
    } catch (error) {
      this.logger.Error({
        message: 'Error committing transaction',
        payload: error,
        eventId: ERROR.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });
      throw error;
    }
  }

  async status(
    payload: WebpayPlusStatusDto,
  ): Promise<WebpayPlusStatusResponseDto> {
    const context = WebpayPlusAdapter.name;
    try {
      this.logger.Information({
        message: 'Getting Webpay Plus transaction status',
        eventId: INFORMATION.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });

      const tx = new WebpayPlus.Transaction(
        new Options(
          IntegrationCommerceCodes.WEBPAY_PLUS,
          IntegrationApiKeys.WEBPAY,
          Environment.Integration,
        ),
      );

      const statusResponse = await tx.status(payload.token);

      return {
        authorizationCode: statusResponse.authorization_code,
        buyOrder: statusResponse.buy_order,
        sessionId: statusResponse.session_id,
        amount: statusResponse.amount,
        status: statusResponse.status,
        paymentTypeCode: statusResponse.payment_type_code,
        responseCode: statusResponse.response_code,
        installmentsNumber: statusResponse.installments_number,
        accountingDate: statusResponse.accounting_date,
        transactionDate: statusResponse.transaction_date,
        cardNumber: statusResponse.card_detail?.card_number,
      };
    } catch (error) {
      this.logger.Error({
        message: 'Error getting transaction status',
        payload: error,
        eventId: ERROR.JSON_PLACE_HOLDER_ADAPTER,
        context,
      });
      throw error;
    }
  }
}