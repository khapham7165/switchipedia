import { Controller, Get, Param } from '@nestjs/common'
import { SwitchModel } from 'src/mongo/models'

@Controller('switch')
export class SwitchesController {
  @Get('/all')
  findAll(): any {
    return SwitchModel.find().populate(['manufacturer', 'brand', 'switchType'])
  }

  @Get(':id')
  findOne(@Param() params): any {
    return SwitchModel.findById(params.id).populate([
      'manufacturer',
      'brand',
      'switchType',
    ])
  }
}
