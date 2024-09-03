module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@assets': './src/assets'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
