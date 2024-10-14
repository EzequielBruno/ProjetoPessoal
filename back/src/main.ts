import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3030'], // Substitua pela URL do seu frontend
    
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.use(cookieParser());
  await app.listen(3030);

}
bootstrap();
