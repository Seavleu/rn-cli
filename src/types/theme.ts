import {
  generateComponents,
  generateFontColors,
  lightColors,
  sizes,
  staticFontSizes,
  staticFontStyles
} from '@/theme'
import layout from '@/theme/layout'
import { Theme } from '@react-navigation/native'
import { ColorSchemeName } from 'react-native'

export type Colors = typeof lightColors
type Layout = typeof layout
type Components = ReturnType<typeof generateComponents>
type Sizes = (typeof sizes)[number]

type MarginVariants = 'm' | 'mb' | 'mt' | 'mr' | 'ml' | 'my' | 'mx'
type PaddingVariants = 'p' | 'pb' | 'pt' | 'pr' | 'pl' | 'py' | 'px'

type MarginKeys =
  | 'margin'
  | 'marginBottom'
  | 'marginTop'
  | 'marginRight'
  | 'marginLeft'
  | 'marginVertical'
  | 'marginHorizontal'

type PaddingKeys =
  | 'padding'
  | 'paddingBottom'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingLeft'
  | 'paddingVertical'
  | 'paddingHorizontal'

type SpacingKeys = `${MarginVariants | PaddingVariants | 'gap'}_${Sizes}`

export type Spacing = {
  [key in SpacingKeys]: {
    [innerKey in MarginKeys | PaddingKeys | 'gap']: number
  }
}

export type FontSizes = {
  [key in `size_${Sizes}`]: {
    fontSize: number
  }
}

export type FontColors = {
  [key in keyof Colors]: {
    color: string
  }
}

type Fonts = ReturnType<typeof generateFontColors> &
  typeof staticFontSizes &
  typeof staticFontStyles

export type Context = {
  theme: ColorSchemeName
  colors: Colors
  layout: Layout
  spacing: Spacing
  fonts: Fonts
  components: Components
  navigationTheme: Theme
}
