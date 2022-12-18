// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '49',
            ios: '10',
          },
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@utils': './src/utils',
            '@contexts': './src/contexts',
            '@interfaces': './src/interfaces',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@configs': './src/configs'
          },
        },
      ],
    ],
  }
}
