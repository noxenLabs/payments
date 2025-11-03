import { Server } from './shared/modules/server/server.config';

function main() {
  return new Server().setup();
}
void main();
