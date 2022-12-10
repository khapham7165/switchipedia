import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import mongoose from 'mongoose'
import { pullSwitch } from 'src/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  // Connect to DB server
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    )
  } catch (error) {
    Logger.error('Cannot connect to DB', error)
  }

  try {
    // Pulling data
    pullSwitch()
  } catch (err) {
    Logger.error('Pulling switch error :>> ' + err)
  }

  app.enableCors()

  try {
    await app.listen(process.env.APP_PORT)
  } catch (err) {
    Logger.error('Cannot listen on App Port', process.env.APP_PORT)
  }
  Logger.log('Listening on port ' + process.env.APP_PORT, 'App')
}

bootstrap()
