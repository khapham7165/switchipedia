import { Controller, Get, Param, Query } from '@nestjs/common'
import { SwitchService } from './switchies.service'

@Controller('switch')
export class SwitchesController {
  constructor(private readonly switchService: SwitchService) {}

  @Get('/all')
  findAll(): any {
    return this.switchService.getAll()
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.switchService.getById(id)
  }

  @Get('/image')
  findImageByPath(@Query() query: { path: string }) {
    const image = this.switchService.getImage(query.path)
    const mimeType = 'image/png'
    return `data:${mimeType};base64,${image}`
  }
}
