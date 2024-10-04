import { Colors } from '@/types/theme'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type AllStyle = Record<string, ImageStyle | TextStyle | ViewStyle>

export default (colors: Colors) => {
  return {
    button: {
      backgroundColor: colors.primary,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    input: {
      borderWidth: 1,
      height: 50,
      paddingLeft: 60,
      borderColor: colors.text,
      borderRadius: 8,
      color: colors.text,
      fontSize: 16
    },
    header: {
      height: 70,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    toast: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.rgba010
    },
    highlightText: {
      color: colors.primary,
      textDecorationLine: 'underline'
    }
  } as const satisfies AllStyle
}
