import { ComponentType } from 'react'
import { AppNavigationParamList } from '@/navigation/AppNavigator'
import AddBoard from '@/screens/DeviceManagement/AddBoard'
import Detail from '@/screens/DeviceManagement/Detail'
import History from '@/screens/DeviceManagement/History'
import UserInfo from '@/screens/UserInfo'
import Setting from '@/screens/DeviceManagement/Setting' 
import Error from '@/screens/DeviceManagement/Error'
import Status from '@/screens/DeviceManagement/Status'
import AlarmHistory from '@/screens/DeviceManagement/AlarmHistory'

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
  },
  {
    name: 'Error',
    component: Error
  }, 
  {
    name: 'Status',
    component: Status
  },
  {
    name: 'AlarmHistory',
    component: AlarmHistory
  }
] as AppNavigator[]
