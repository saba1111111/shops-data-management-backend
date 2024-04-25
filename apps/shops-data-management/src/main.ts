import { NestFactory } from '@nestjs/core';
import { ShopsDataManagementModule } from './shops-data-management.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopsDataManagementModule);
  await app.listen(8080);
}
bootstrap();
