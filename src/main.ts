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

  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de mi API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get(`/${globalPrefix}/openapi.json`, (_req, res) => {
    res.json(document);
  });

  app.use(
    `/${globalPrefix}/reference`,
    apiReference({
      url: `/${globalPrefix}/openapi.json`,
    }),
  );

  await app.listen(port);
  logger.log(`API Gateway running on http://localhost:${port}`);
  logger.log(`Scalar docs on http://localhost:${port}/${globalPrefix}/reference`);
  logger.log(`OpenAPI spec on http://localhost:${port}/${globalPrefix}/openapi.json`);
}
bootstrap();