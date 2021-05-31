import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`),
})

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import cookieParser = require('cookie-parser')

async function bootstrap() {
  console.log('Helllllllllllo world!')
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  )

  const swaggerOptions = new DocumentBuilder()
    .setTitle('ATTENDENCE API')
    .setDescription('ATTENDENCE API documentation')
    .setVersion('0.1')
    // .setBasePath('/api')
    // .addServer('http://') // 그냥 https 만 붙여야 할 수 도
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(3000)
}
bootstrap()
