// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add any additional plugins you might need for SDK 52
      // For example, if you're using module resolver:
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@utils': './src/utils',
            '@contexts': './src/contexts',
            '@interfaces': './src/interfaces',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@configs': './src/configs',
            '@screens': './src/screens',
          },
        },
      ],
    ],
  }
}
