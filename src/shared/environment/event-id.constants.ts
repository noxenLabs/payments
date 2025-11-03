import { EventId } from '../modules/logger/event-id.type';

export class INFORMATION {
  static readonly ENVIRONMENT_INITIALIZATION: EventId = {
    id: 10000,
    name: 'Info Environment Initialization',
  };
  static readonly MAIN_INITIALIZATION: EventId = {
    id: 10001,
    name: 'Info Microservice Initialization',
  };
  static readonly JSON_PLACE_HOLDER_CONTROLLER: EventId = {
    id: 10002,
    name: 'Info JsonPlaceHolderController',
  };
  static readonly JSON_PLACE_HOLDER_SERVICE: EventId = {
    id: 10003,
    name: 'Info JsonPlaceHolderService',
  };
  static readonly JSON_PLACE_HOLDER_ADAPTER: EventId = {
    id: 10004,
    name: 'Info JsonPlaceHolderAdapter',
  };
  static readonly JSON_PLACE_HOLDER_MAPPER_RESPONSE_API: EventId = {
    id: 10005,
    name: 'Info MapperRepsonseAPi',
  };
}
export class ERROR {
  static readonly UNEXPECTED: EventId = {
    id: 997,
    name: 'Unexpected Error',
  };
  static readonly ENVIRONMENT_INITIALIZATION: EventId = {
    id: 998,
    name: 'Critical Error Environment Initialization',
  };
  static readonly LOGGER_INITIALIZATION: EventId = {
    id: 999,
    name: 'Critical Error Initialization Logger Factory',
  };
  static readonly JSON_PLACE_HOLDER_ADAPTER: EventId = {
    id: 20001,
    name: 'Error JsonPlaceHolderAdapter',
  };
}
