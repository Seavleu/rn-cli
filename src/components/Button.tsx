import {
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import React, { ReactNode } from 'react'
import { RNText } from './Custom'
import useTheme from '@/theme/hooks'

type ButtonProps = {
  title: string | ReactNode
  onPress: () => void
  disabled?: boolean
  style?: ImageStyle | TextStyle | ViewStyle
}

const Button = ({ title, onPress, disabled, style }: ButtonProps) => {
  const { components, fonts, colors } = useTheme()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        components.button,
        style,
        { backgroundColor: disabled ? colors.rgba030 : colors.primary }
      ]}
      disabled={disabled}>
      <RNText style={[fonts.w700, { color: '#fff' }]}>{title}</RNText>
    </TouchableOpacity>
  )
}

export default Button
