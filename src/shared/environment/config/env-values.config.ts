import { InternalServerErrorException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ERROR, INFORMATION } from '../event-id.constants';

dotenv.config();

export class EnvValues {
  ENV: string;
  TYPE: string;
  COMPONENT: string;
  PORT: number;
  JSON_PLACE_HOLDER_GET_URL: string;
  GLOBAL_PREFIX: string;

  constructor() {
    this.ENV = this.validateValue<string>(process.env.ENV, 'ENV');
    this.TYPE = this.validateValue<string>(process.env.TYPE, 'TYPE');
    this.COMPONENT = this.validateValue<string>(
      process.env.COMPONENT,
      'COMPONENT',
    );
    this.PORT = this.validateValue<number>(Number(process.env.PORT), 'PORT');
    this.JSON_PLACE_HOLDER_GET_URL = this.validateValue<string>(
      process.env.JSON_PLACE_HOLDER_GET_URL,
      'JSON_PLACE_HOLDER_GET_URL',
    );
    this.GLOBAL_PREFIX = this.validateValue<string>(
      process.env.GLOBAL_PREFIX,
      'GLOBAL_PREFIX',
    );
    console.info(
      'Success environment intializaiton' +
        JSON.stringify({
          severity: 'INFO',
          EventId: INFORMATION.ENVIRONMENT_INITIALIZATION,
          context: EnvValues.name,
        }),
    );
    // TODO: Active only for local use. Remove bofere upload you code in production enviornment.
    process.env.NODE_TLS_REJECT_UNATHORIZED = '0';
  }
  private static instance: EnvValues;

  static get(): EnvValues {
    if (!EnvValues.instance) {
      EnvValues.instance = new EnvValues();
    }
    return EnvValues.instance;
  }

  private validateValue<T>(value: T | undefined, valueName: string): T {
    if (!value) {
      const errorMessage = `environmet value -> ${valueName}. not found`;
      console.error(
        errorMessage +
          ' ' +
          JSON.stringify({
            severity: 'ERROR',
            EventId: ERROR.ENVIRONMENT_INITIALIZATION,
            context: EnvValues.name,
          }),
      );
      throw new InternalServerErrorException(errorMessage);
    }
    return value;
  }
}
