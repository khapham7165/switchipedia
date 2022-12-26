import { convertSwitchMdToJson, readFiles } from './misc'

import { Logger } from '@nestjs/common'
import {
  BrandModel,
  ManufacturerModel,
  SwitchModel,
  SwitchTypeModel,
} from '../mongo/models'
import { exec } from 'node:child_process'
import { Model } from 'mongoose'
import { isEmpty } from 'lodash'

const checkExisted = async (model: Model<any>, item: Record<string, any>) => {
  let existedManufacture = await model.findOne(item)

  if (!existedManufacture) {
    existedManufacture = new model(item)
    await existedManufacture.save()
    Logger.log(`New ${model.modelName}: ` + JSON.stringify(item))
  }

  return existedManufacture
}

const onRead = async (fileName: string, content: string) => {
  Logger.log('Converting ' + fileName)
  const rawText = content
  const variant = convertSwitchMdToJson(rawText)

  if (!variant) return

  const { manufacturer, brand, specs, switchType, title } = variant

  // manufacture

  const checkedManufacturer = await checkExisted(ManufacturerModel, {
    name: manufacturer,
  })

  // brand

  const checkedBrand = await checkExisted(BrandModel, {
    name: brand,
  })

  // switchType
  const checkedSwitchType = await checkExisted(SwitchTypeModel, {
    name: switchType,
  })

  const switchSet = {
    ...variant,
    manufacturer: checkedManufacturer,
    brand: checkedBrand,
    switchType: checkedSwitchType,
    specs: specs?.map((spec, index) => ({
      ...spec,
      forceGraph: isEmpty(spec.forceGraph) ? undefined : spec.forceGraph,
    })),
    thereminGoatScores:
      variant.thereminGoatScores?.[0] || variant.thereminGoatScores,
    rawText,
    variant,
  }

  const existedSwitch = await SwitchModel.findOne({ title })

  if (existedSwitch) {
    await SwitchModel.updateOne(
      { _id: existedSwitch._id },
      {
        $set: switchSet,
      },
    )
    existedSwitch.rawText = rawText
    existedSwitch
      .save()
      .then(() => Logger.log('Updated - ' + existedSwitch.variant.title))
  } else {
    if (!variant.title) {
      Logger.log(variant.title + ' has no ID')

      return
    }

    const newSwitch = new SwitchModel(switchSet)

    newSwitch
      .save()
      .then(() => Logger.log('Saved new switch - ' + newSwitch?.variant?.title))
  }
}

export const pullSwitch = (timer?: number) => {
  // Service started from here ----------------------------------------------
  const pullChain = () => {
    const currentDir = process.cwd() + '/src'
    Logger.log('Pulling switches.mx...')
    exec('cd ' + currentDir + ' && cd switches.mx && git pull', (exception) => {
      if (exception) {
        Logger.log(exception)
        Logger.log('Pulling Repo...')
        exec(
          'cd ' +
            currentDir +
            ' && git clone https://github.com/BWLR/switches.mx.git',
          (exception) => !exception && pullChain(),
        )
      } else {
        Logger.log('Pulling Done')
        readFiles('./src/switches.mx/content/collections/switches/', onRead)
      }
    })
  }

  // Start pulling after call
  pullChain()
  // Update switches into DB every 'timer' || day
  setInterval(pullChain, timer || 1000 * 60 * 60 * 24)
}
