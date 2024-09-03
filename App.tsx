import DefaultNavigator from '@/navigation'
import { ThemeProvider } from '@/theme/ThemeProvider'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide()
    // }, 1000)
  }, [])

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <DefaultNavigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
