import { ExpoConfig } from 'expo/config'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

const config: ExpoConfig = {
  name: 'Switchipedia',
  slug: 'switchipedia',
  extra: {
    backendUrl: process.env.BACK_END_URL,
  },
  // Necessary for SDK 52
  sdkVersion: '52.0.0',
}

export default config
