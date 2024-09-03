import { ReactNode } from 'react'
import {
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  TextProps,
  ViewProps
} from 'react-native'
import useTheme from '@/theme/hooks'

type CustomProps = TextProps &
  ViewProps & {
    style?: StyleProp<TextStyle | ViewStyle | ImageStyle>
    children?: ReactNode
  }

export const RNText = ({ style, children, ...rest }: CustomProps) => {
  const { fonts } = useTheme()

  return (
    <Text style={[fonts.w400, fonts.size_16, fonts.text, style]} {...rest}>
      {children}
    </Text>
  )
}

export const RNView = ({ style, children }: CustomProps) => {
  const { colors } = useTheme()

  return (
    <View style={[{ backgroundColor: colors.background }, style]}>
      {children}
    </View>
  )
}
