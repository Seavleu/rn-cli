import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import { RNText, RNView } from '@/components/Custom'
import useTheme from '@/theme/hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchCircle } from '@/components/Touch'
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'

type UserInfoProps = {
  navigation: AppStackNavigatorProps
}

const UserInfo = ({ navigation }: UserInfoProps) => {
  const { colors, components, fonts, layout, spacing } = useTheme()

  const Header = () => (
    <View
      style={[
        components.header,
        layout.justifyBetween,
        { borderBottomWidth: 1, borderColor: colors.rgba010 }
      ]}>
      <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
        <TouchCircle style={[spacing.p_4]} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color={colors.text} />
        </TouchCircle>
        <RNText style={[fonts.w700, fonts.size_18]}>내 정보</RNText>
      </View>
      <TouchCircle
        style={[spacing.p_4]}
        onPress={() => navigation.navigate('Setting')}>
        <Icon name="settings" size={20} color={colors.text} />
      </TouchCircle>
    </View>
  )

  return (
    <SafeAreaScreen>
      <RNView style={[layout.flex_1]}>
        <Header />

        <View style={[spacing.p_20]}></View>
      </RNView>
    </SafeAreaScreen>
  )
}

export default UserInfo
