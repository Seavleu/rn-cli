import { ComponentType } from 'react'
import { AppNavigationParamList } from '@/navigation/AppNavigator'
import AddBoard from '@/screens/AddBoard'
import Detail from '@/screens/Detail'
import History from '@/screens/History'
import UserInfo from '@/screens/UserInfo'
import Setting from '@/screens/Setting'

type AppNavigator = {
  name: keyof AppNavigationParamList
  component: ComponentType<any>
}

export const APP_NAVIGATOR = [
  {
    name: 'History',
    component: History
  },
  {
    name: 'Detail',
    component: Detail
  },
  {
    name: 'AddBoard',
    component: AddBoard
  },
  {
    name: 'UserInfo',
    component: UserInfo
  },
  {
    name: 'Setting',
    component: Setting
  }
] as AppNavigator[]
