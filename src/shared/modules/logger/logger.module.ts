import { TransportSingleOptions } from 'pino';
import { EnvValues } from '../../environment/config/env-values.config';
import { LoggerModule as LM } from 'nestjs-pino';
import * as dotenv from 'dotenv';
import { Global, Module } from '@nestjs/common';
import {
  REDACT_CENSOR,
  REDACT_PATHS,
} from '../../environment/redact.constants';
import { IncomingMessage } from 'http';
import { Constants } from '../../environment/constants';
import { LoggerFactory } from './logger-factory';
import { ERROR } from '@shared/environment/event-id.constants';

dotenv.config();

const getTransportConfig = (): TransportSingleOptions | undefined => {
  return EnvValues.get().ENV === 'local'
    ? {
        target: 'pino-pretty',
        options: {
          ignore: 'time',
          messageKey: 'message',
          singleLine: true,
        },
      }
    : undefined;
};

@Global()
@Module({
  imports: [
    LM.forRootAsync({
      useFactory: () => {
        try {
          return {
            pinoHttp: {
              transport: getTransportConfig(),
              useLevel: 'info',
              messageKey: 'message',
              autoLogging: false,
              base: null,
              redact: {
                paths: REDACT_PATHS,
                censor: REDACT_CENSOR,
              },
              customProps: (req: IncomingMessage) => ({
                consumer: req.headers[Constants.CHANNEL_ID],
                correlationId: req.headers[Constants.CORRELATION_ID],
                spanId: req.headers[Constants.SPAN_ID],
                parentId: req.headers[Constants.PARENT_ID],
                transactionId: req.headers[Constants.TRANSACTION_ID],
                type: EnvValues.get().TYPE,
                env: EnvValues.get().ENV,
                timestamp: Date.now(),
              }),
              formatters: {
                level: (label) => ({
                  level: undefined,
                  severity: label.toUpperCase(),
                }),
              },
              serializers: {
                req: () => undefined,
                res: () => undefined,
              },
            },
          };
        } catch (error) {
          console.error(ERROR.LOGGER_INITIALIZATION, error);
          throw error;
        }
      },
    }),
  ],
  providers: [LoggerFactory],
  exports: [LoggerFactory],
})
export class LoggerModule {}
