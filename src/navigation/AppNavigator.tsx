import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { APP_NAVIGATOR } from '@/constants/navigation'

export type AppNavigationParamList = {
  History: undefined
  Detail: { id: number }
  AddBoard: { data: any }
  UserInfo: undefined
  Setting: undefined  
  Error: undefined
}

export type AppStackNavigatorProps =
  NativeStackNavigationProp<AppNavigationParamList>

const Stack = createNativeStackNavigator<AppNavigationParamList>()

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Error">
      {APP_NAVIGATOR.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  )
}

export default AppNavigator
