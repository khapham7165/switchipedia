import { convertSwitchMdToJson, readFiles } from './utils'

import mongoose from 'mongoose'

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/switch')

  // const switchSchema = new mongoose.Schema({
  //   name: String
  // })

  const onRead = (fileName: string, content: string) => {
    console.log('fileName :>> ', fileName)
    const converted = convertSwitchMdToJson(content)
    console.log('converted :>> ', converted.id)
  }

  const onReadError = (err: Error) => {
    console.log('err :>> ', err)
  }

  readFiles('./switches/', onRead, onReadError)
}

main().catch((err: Error) => console.log(err))
