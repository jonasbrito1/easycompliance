import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('EasyCompliance API')
    .setDescription('API de Gestão de Compliance Multi-Tenant')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação e Autorização')
    .addTag('users', 'Gestão de Usuários')
    .addTag('companies', 'Gestão de Empresas')
    .addTag('risks', 'Gestão de Riscos')
    .addTag('controls', 'Gestão de Controles')
    .addTag('documents', 'Gestão de Documentos')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'EasyCompliance API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = configService.get('PORT') || 3001;
  await app.listen(port);

  console.log(`
    🚀 EasyCompliance API is running on: http://localhost:${port}
    📚 Swagger Docs: http://localhost:${port}/api/docs
    🔒 Environment: ${configService.get('NODE_ENV')}
  `);
}

bootstrap();
