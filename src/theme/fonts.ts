import { TextStyle } from 'react-native'
import { sizes } from './_config'
import { Colors, FontColors, FontSizes } from '@/types/theme'

export const generateFontColors = (colors: Colors): FontColors => {
  return Object.keys(colors).reduce((acc, key) => {
    acc[key as keyof Colors] = { color: colors[key as keyof Colors] }
    return acc
  }, {} as FontColors)
}

export const staticFontSizes = sizes.reduce((acc, size) => {
  return Object.assign(acc, {
    [`size_${size}`]: {
      fontSize: size
    }
  })
}, {} as FontSizes)

export const staticFontStyles = {
  w100: {
    fontFamily: 'Pretendard-Thin'
  },
  w200: {
    fontFamily: 'Pretendard-ExtraLight'
  },
  w300: {
    fontFamily: 'Pretendard-Light'
  },
  w400: {
    fontFamily: 'Pretendard-Regular'
  },
  w500: {
    fontFamily: 'Pretendard-Medium'
  },
  w600: {
    fontFamily: 'Pretendard-SemiBold'
  },
  w700: {
    fontFamily: 'Pretendard-Bold'
  },
  w800: {
    fontFamily: 'Pretendard-ExtraBold'
  },
  w900: {
    fontFamily: 'Pretendard-Black'
  },
  lower: {
    textTransform: 'lowercase'
  },
  upper: {
    textTransform: 'uppercase'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  alignCenter: {
    textAlign: 'center'
  }
} as const satisfies Record<string, TextStyle>
