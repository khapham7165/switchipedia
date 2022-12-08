import { ExpoConfig } from 'expo/config'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()
// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'Switchipedia',
  slug: 'switchipedia',
  extra: {
    backendUrl: process.env.BACK_END_URL,
  },
}

export default config
