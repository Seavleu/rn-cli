import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import { RNText, RNView } from '@/components/Custom'
import useTheme from '@/theme/hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchCircle, TouchRect } from '@/components/Touch'
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'

type SettingProps = {
  navigation: AppStackNavigatorProps
}

const Setting = ({ navigation }: SettingProps) => {
  const { colors, components, fonts, layout, spacing } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const Header = () => (
    <View
      style={[
        components.header,
        { borderBottomWidth: 1, borderColor: colors.rgba010 }
      ]}>
      <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
        <TouchCircle style={[spacing.p_4]} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color={colors.text} />
        </TouchCircle>
        <RNText style={[fonts.w700, fonts.size_18]}>설정 관리</RNText>
      </View>
    </View>
  )

  return (
    <SafeAreaScreen>
      <RNView style={[layout.flex_1]}>
        <Header />

        <View style={[spacing.p_20, spacing.gap_30]}>
          <View style={[spacing.gap_10]}>
            <RNText style={[fonts.w100, fonts.size_12]}>알림 설정</RNText>
            <View
              style={[layout.row, layout.justifyBetween, layout.alignCenter]}>
              <RNText>알림 수신 관리</RNText>
              <Switch
                trackColor={{ false: '#767577', true: '#fff' }}
                thumbColor={isEnabled ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View
              style={[layout.row, layout.justifyBetween, layout.alignCenter]}>
              <RNText>진동</RNText>
              <Switch
                trackColor={{ false: '#767577', true: '#fff' }}
                thumbColor={isEnabled ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <View style={[spacing.gap_10]}>
            <RNText style={[fonts.w100, fonts.size_12]}>사용자 설정</RNText>
            <TouchRect
              style={[layout.row, layout.justifyBetween, layout.alignCenter]}>
              <RNText>사용자 계정 관리</RNText>
            </TouchRect>
          </View>
        </View>
      </RNView>
    </SafeAreaScreen>
  )
}

export default Setting
