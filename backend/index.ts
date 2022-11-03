import mongoose from 'mongoose'
import { pullSwitch } from './src/utils'

const main = async() => {
  try {
    // Connect to DB server
    await mongoose.connect('mongodb://localhost:27017/switchipedia')

    // Pulling data
    pullSwitch()
  }
  catch(err) {
    console.log('err :>> ', err);
  }
}

main()