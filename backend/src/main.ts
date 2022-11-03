import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import mongoose from 'mongoose'
import { pullSwitch } from 'src/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  try {
    // Connect to DB server
    await mongoose.connect('mongodb://localhost:27017/switchipedia')

    // Pulling data
    pullSwitch()
  } catch (err) {
    console.log('Pulling switch error :>> ', err)
  }

  await app.listen(3000)
}
bootstrap()
