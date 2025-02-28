import { getDefaultConfig } from 'expo/metro-config'

const defaultConfig = getDefaultConfig(__dirname)

// Add any custom metro configuration here if needed
// For SDK 52, we may need to handle new file extensions
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: defaultConfig.resolver?.sourceExts
      ? [...defaultConfig.resolver.sourceExts, 'mjs']
      : ['js', 'jsx', 'ts', 'tsx', 'json', 'mjs'],
  },
}

module.exports = config
