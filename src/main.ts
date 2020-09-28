import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

const port = process.env.SERVER_PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('All The API\'s')
    .setDescription('Trying out NestJs, TypeOrm and Swagger')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`Server listening at http://192.168.1.168:${port}`);

}
bootstrap();
