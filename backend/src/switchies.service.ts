import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { SwitchModel } from './mongo/models'
import * as fs from 'fs'

@Injectable()
export class SwitchService {
  getAll(): any {
    return SwitchModel.find()
      .populate(['manufacturer', 'brand', 'switchType'])
      .select('-variant -rawText')
  }

  getById(id: string): any {
    return SwitchModel.findById(id).populate([
      'manufacturer',
      'brand',
      'switchType',
    ])
  }

  getImage(path: string) {
    const imagePath = `./src/switches.mx/public/assets/${path}`

    try {
      const data = fs.readFileSync(imagePath)
      return Buffer.from(data).toString('base64')
    } catch (error) {
      Logger.error('No such image in ' + imagePath, 'Switch')
      throw new HttpException(
        'No such image in ' + imagePath,
        HttpStatus.NOT_FOUND,
      )
    }
  }

  async getHomeLatestSwitches() {
    const res = await SwitchModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate(['manufacturer', 'brand', 'switchType'])
      .select('title name createdAt photos')

    return res
  }
}
