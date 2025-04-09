import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filter/validation-exception.filter';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      forbidNonWhitelisted:false,
      transform:true
    }
  ))
  app.useGlobalFilters(new ValidationExceptionFilter(),new HttpExceptionFilter())
  app.enableCors({
    origin:"http://localhost",
    methods:'GET,POST',
    allowedHeaders: 'Content-Type, Authorization', 

  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
