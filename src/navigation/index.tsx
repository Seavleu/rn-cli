import { RNText } from '@/components/Custom'
import Login from '@/screens/Login'
import { useUserStore } from '@/stores'
import useTheme from '@/theme/hooks'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Toast, { ToastConfig } from 'react-native-toast-message'
import AppNavigator from './AppNavigator'

const DefaultNavigator = () => {
  const { userInfo } = useUserStore()
  const { components, fonts, navigationTheme } = useTheme()

  const toastConfig: ToastConfig = {
    customToast: ({ text1 }) => (
      <View style={[components.toast]}>
        <RNText style={[fonts.text, fonts.size_14]}>{text1}</RNText>
      </View>
    )
  }
  return (
    <NavigationContainer theme={navigationTheme}>
      {userInfo ? <AppNavigator /> : <Login />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  )
}

export default DefaultNavigator
