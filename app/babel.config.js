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
    plugins: [['import', { libraryName: '@ant-design/react-native' }]],
  }
}
