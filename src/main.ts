import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault("Asia/Bangkok")  

  const app = await NestFactory.create(AppModule);
  
  if (process.env.ENVIRONMENT!=='prod') {
    const config = new DocumentBuilder()
      .setTitle('NestJS Starter API')
      .setDescription('NestJS Starter API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  app.enableCors();
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new I18nValidationExceptionFilter({}));

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();
