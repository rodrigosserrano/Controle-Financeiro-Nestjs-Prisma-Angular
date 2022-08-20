import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
      .setTitle('Finance.io')
      .setDescription('Finance.io API')
      .setVersion('1.1')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS",
  });

  await app.listen(3000);
}
bootstrap();
