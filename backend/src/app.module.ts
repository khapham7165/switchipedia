import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { SwitchesController } from './switches/switches.controller'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SwitchesController],
  providers: [AppService],
})
export class AppModule {}
