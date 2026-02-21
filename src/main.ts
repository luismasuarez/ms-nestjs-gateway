import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de mi API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 👇 Scalar bajo el mismo prefijo
  app.use(
    `/${globalPrefix}/reference`,
    apiReference({
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`API Gateway running on http://localhost:${process.env.PORT ?? 3000}`);
  logger.log(`Scalar docs on http://localhost:${process.env.PORT ?? 3000}/${globalPrefix}/reference`);
}
bootstrap();