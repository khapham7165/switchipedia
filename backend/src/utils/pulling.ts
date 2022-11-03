import { convertSwitchMdToJson, readFiles } from './misc'

import { Logger } from '@nestjs/common'
import { SwitchModel } from '../model'
import { exec } from 'node:child_process'

const onRead = async (fileName: string, content: string) => {
  Logger.log('Converting', fileName)
  const rawText = content
  const variant = convertSwitchMdToJson(rawText)
  const existedSwitch = await SwitchModel.findById(variant.id)
  if (existedSwitch) {
    existedSwitch.variant = variant
    existedSwitch.rawText = rawText
    existedSwitch
      .save()
      .then(() => Logger.log('Updated ', existedSwitch.variant.title))
  } else {
    if (!variant.id) {
      Logger.log(variant.title + ' has no ID')

      return
    }

    const newSwitch = new SwitchModel({
      _id: variant.id,
      rawText,
      variant,
    })

    newSwitch
      .save()
      .then(() => Logger.log('Saved new switch ', newSwitch?.variant?.title))
  }
}

const onReadError = (err: Error) => {
  Logger.error('err :>> ', err)
}

export const pullSwitch = (timer?: number) => {
  // Service started from here ----------------------------------------------

  const pullChain = () => {
    const currentDir = process.cwd()
    Logger.log('Pulling switches.mx...')
    exec('cd ' + currentDir + '&& cd switches.mx && git pull', () => {
      Logger.log('Pulling Done')
      readFiles(
        './src/switches.mx/content/collections/switches/',
        onRead,
        onReadError,
      )
    })
  }

  pullChain()
  // Update switches into DB every 'timer' || day
  setInterval(pullChain, timer || 1000 * 60 * 60 * 24)
}
