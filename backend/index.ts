import { convertSwitchMdToJson, readFiles } from './utils'

import mongoose from 'mongoose'
import shell from 'shelljs'

type VariantSwitchDataType = {
  title: string
  id: string
  blueprint: string
  volume: string
  factory_lubed: string
  film: string
  notes: string
  manufacturer: string
  brand: string
  switch_type: string
  mount: string
}

const switchSchema = new mongoose.Schema({
  _id: String,
  variant: Object,
  rawText: String,
})

const SwitchModel = mongoose.model('Switch', switchSchema)

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

const main = async () => {
  // Service started from here ----------------------------------------------

  // Connect to DB server
  await mongoose.connect('mongodb://localhost:27017/switch')

  const pullSwitch = () => {
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

  pullSwitch()
  // Update switches into DB every day
  setInterval(pullSwitch, 1000 * 60 * 60 * 24)
}

main().catch((err: Error) => console.log(err))
