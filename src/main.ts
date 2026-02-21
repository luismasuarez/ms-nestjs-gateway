import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors();

  // Prefijo global
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`API Gateway running on http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
