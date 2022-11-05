import { Controller, Get } from '@nestjs/common'
import { SwitchModel } from 'src/mongo/models'

@Controller('switches')
export class SwitchesController {
  @Get('/all')
  findAll(): any {
    return SwitchModel.find()
  }
}
