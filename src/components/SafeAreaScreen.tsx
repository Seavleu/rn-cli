import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

type SafeAreaScreenProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle> | StyleProp<TextStyle>
}

export const SafeAreaScreen = ({ children, style }: SafeAreaScreenProps) => {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView
      style={[
        style,
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}>
      {children}
    </SafeAreaView>
  )
}
