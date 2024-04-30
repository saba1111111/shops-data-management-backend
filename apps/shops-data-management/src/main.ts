import { NestFactory } from '@nestjs/core';
import { ShopsDataManagementModule } from './shops-data-management.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ShopsDataManagementModule);

  const config = new DocumentBuilder()
    .setTitle('Shops Data Management')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
