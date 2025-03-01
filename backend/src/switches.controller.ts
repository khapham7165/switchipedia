import { Controller, Get, Param, Query } from '@nestjs/common'
import { SwitchService } from './switchies.service'

@Controller('switch')
export class SwitchesController {
  constructor(private readonly switchService: SwitchService) {}

  @Get('/all')
  findAll(@Query() query: { page?: number; limit?: number }): any {
    const page = query.page ? parseInt(query.page as unknown as string) : 1
    const limit = query.limit ? parseInt(query.limit as unknown as string) : 10
    return this.switchService.getAll(page, limit)
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.switchService.getById(id)
  }

  @Get('/top-home')
  findTopHome(@Query() query: { type: string; amount: number }) {
    const { type, amount } = query
    return this.switchService.getHomeLatestSwitches(type, amount)
  }
}
