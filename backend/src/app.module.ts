import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { SwitchesController } from './switches.controller'
import { SwitchService } from './switchies.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SwitchesController],
  providers: [AppService, SwitchService],
})
export class AppModule {}
