import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { SwitchModel, SwitchTypeModel } from './mongo/models'
import * as fs from 'fs'

@Injectable()
export class SwitchService {
  async getAll(page = 1, limit = 10): Promise<any> {
    const skip = (page - 1) * limit

    const [items, totalCount] = await Promise.all([
      SwitchModel.find()
        .populate(['manufacturer', 'brand', 'switchType'])
        .select('-variant -rawText')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      SwitchModel.countDocuments(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return {
      items,
      meta: {
        totalCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }
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

  async getHomeLatestSwitches(type?: string, amount = 10) {
    const dbType = type && (await SwitchTypeModel.find({ name: type }))
    const res = await SwitchModel.find(type && { switchType: dbType })
      .populate(['manufacturer', 'brand', 'switchType'])
      .sort({ createdAt: -1 })
      .limit(amount)
      .select('title name createdAt photos notes')

    return res
  }
}
