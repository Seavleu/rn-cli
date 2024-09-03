import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Appearance, ColorSchemeName, StatusBar } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import {
  layout,
  darkColors,
  lightColors,
  generateFontColors,
  staticFontSizes,
  staticFontStyles,
  generateSpacing,
  generateComponents
} from '..'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Context } from '@/types/theme'

export const ThemeContext = createContext<Context | undefined>(undefined)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() || 'dark'
  )
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleAppearanceChange = ({
      colorScheme
    }: {
      colorScheme: ColorSchemeName
    }) => setTheme(colorScheme)

    const subscription = Appearance.addChangeListener(handleAppearanceChange)
    return () => subscription.remove()
  }, [])

  const colors = useMemo(() => {
    return isDark ? darkColors : lightColors
  }, [isDark])

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(colors.background)
    SystemNavigationBar.setBarMode(isDark ? 'light' : 'dark')
  }, [isDark, colors])

  const generateStyles = useMemo(() => {
    return {
      fonts: generateFontColors(colors),
      components: generateComponents(colors),
      navigationTheme: isDark ? DarkTheme : DefaultTheme
    }
  }, [isDark, colors])

  const value = {
    theme,
    colors,
    layout,
    components: generateStyles.components,
    spacing: generateSpacing,
    fonts: {
      ...generateStyles.fonts,
      ...staticFontSizes,
      ...staticFontStyles
    },
    navigationTheme: generateStyles.navigationTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  )
}
