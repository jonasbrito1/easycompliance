import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('EasyCompliance API')
    .setDescription('API para plataforma de compliance B2B2C')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação')
    .addTag('users', 'Usuários')
    .addTag('companies', 'Empresas')
    .addTag('risks', 'Riscos')
    .addTag('controls', 'Controles')
    .addTag('documents', 'Documentos')
    .addTag('action-plans', 'Planos de Ação')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`
  🚀 EasyCompliance API rodando em: http://localhost:${port}/api/v1
  📚 Documentação Swagger: http://localhost:${port}/api/docs
  `);
}

bootstrap();
