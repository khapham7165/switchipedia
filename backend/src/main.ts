import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import mongoose from 'mongoose'
import { pullSwitch } from 'src/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Connect to DB server
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  )
  try {
    // Pulling data
    pullSwitch()
  } catch (err) {
    Logger.error('Pulling switch error :>> ' + err)
  }

  await app.listen(process.env.APP_PORT)
  Logger.log('Listening on port ' + process.env.APP_PORT, 'App')
}
bootstrap()
