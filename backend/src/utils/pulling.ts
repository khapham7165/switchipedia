import { convertSwitchMdToJson, readFiles } from './misc'

import { SwitchModel } from '../model'
import shell from 'shelljs'

const onRead = async (fileName: string, content: string) => {
  console.log('Converting :>> ', fileName)
  const rawText = content
  const variant = convertSwitchMdToJson(rawText)
  const existedSwitch = await SwitchModel.findById(variant.id)
  if (existedSwitch) {
    existedSwitch.variant = variant
    existedSwitch.rawText = rawText
    existedSwitch
      .save()
      .then(() => console.log('Updated :>> ', existedSwitch.variant.title))
  } else {
    if (!variant.id) {
      console.log(variant.title + 'has no ID')

      return
    }

    const newSwitch = new SwitchModel({
      _id: variant.id,
      rawText,
      variant,
    })

    newSwitch
      .save()
      .then(() =>
        console.log('Saved new switch :>> ', newSwitch?.variant?.title)
      )
  }
}

const onReadError = (err: Error) => {
  console.log('err :>> ', err)
}

export const pullSwitch = () => {
  // Service started from here ----------------------------------------------

  const pullChain = () => {
    const currentDir = process.cwd()
    shell.cd(currentDir)
    console.log('Pulling switches.mx...')
    shell.exec('cd switches.mx && git pull')
    readFiles(
      './switches.mx/content/collections/switches/',
      onRead,
      onReadError
    )
  }

  pullChain()
  // Update switches into DB every day
  setInterval(pullChain, 1000 * 60 * 60 * 24)
}
