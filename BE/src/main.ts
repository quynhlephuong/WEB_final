/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5500',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('petshop')
    .setDescription('petshop APIs Documentation')
    .setVersion('1.0')
    .build();
  const document = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document());

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
