import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function ApiDocumentation() {
  return (target: Function) => {
    const controllerName = target.name.replace(/Controller$/, '');
    Controller(controllerName)(target);
    ApiTags(controllerName)(target);
  };
}