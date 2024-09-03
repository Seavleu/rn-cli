import useTheme from '@/theme/hooks'
import React, { ReactNode } from 'react'
import { RectButton } from 'react-native-gesture-handler'

type TouchProps = {
  children: ReactNode
  onPress?: () => void
  style?: any
}

export const TouchRect = ({ onPress, children, style }: TouchProps) => {
  const { colors } = useTheme()
  return (
    <RectButton onPress={onPress} rippleColor={colors.rgba010} style={style}>
      {children}
    </RectButton>
  )
}

export const TouchCircle = ({ onPress, children, style }: TouchProps) => {
  const { colors } = useTheme()
  return (
    <RectButton
      onPress={onPress}
      rippleColor={colors.rgba010}
      style={[style, { borderRadius: 9999 }]}>
      {children}
    </RectButton>
  )
}
