import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `DataBase ${process.env.DB_NAME || 'ej3_db'} is running on ${process.env.HOST || 'localhost'}:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
