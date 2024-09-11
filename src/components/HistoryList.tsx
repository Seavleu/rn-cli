import { View } from 'react-native'
import React from 'react'
import useTheme from '@/theme/hooks'
import { RNView, RNText } from './Custom'
import { TouchRect } from './Touch'
import Icon from 'react-native-vector-icons/Ionicons'

export const Inspection = ({ V, navigation }: { V: any; navigation: any }) => {
  const { layout, fonts, colors, spacing } = useTheme()

  return (
    <RNView
      key={V.inspection_seq}
      style={[{ marginTop: 14, borderBottomWidth: 1, borderColor: colors.rgba005, borderRadius: 8 }]}>
      <TouchRect
        onPress={() => navigation.navigate('Detail', { id: V.inspection_seq })}
        style={[spacing.px_14, spacing.py_18, spacing.gap_6]}> 
        <RNText style={[fonts.w700]} numberOfLines={1} ellipsizeMode="tail">
          {V.title}
        </RNText>
        <RNText style={[fonts.size_14]} numberOfLines={2} ellipsizeMode="tail">
          {V.content}
        </RNText>

        <View style={[layout.row, layout.alignCenter, layout.justifyBetween]}>
          <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
            <Icon name="calendar" color={colors.rgba070} />
            <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
              {V.reg_date}
            </RNText>
          </View>
          <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
            <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
              <Icon name="eyedrop" color={colors.rgba070} />
              <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                {V.ins_type}
              </RNText>
            </View>
            <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
              <Icon name="eye" color={colors.rgba070} />
              <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                {V.view_cnt}
              </RNText>
            </View>
          </View>
        </View>
      </TouchRect>
    </RNView>
  )
}

export const ErrorFix = ({ V, navigation }: { V: any; navigation: any }) => {
  const { layout, fonts, colors, spacing } = useTheme()

  return (
    <RNView
      key={V.inspection_seq}
      style={[{ marginTop: 14, borderBottomWidth: 1, borderColor: colors.rgba005, borderRadius: 8 }]}>
      <TouchRect
        onPress={() =>
          navigation.navigate('Detail', { id: V.device_error_fix_seq })
        }
        style={[spacing.px_14, spacing.py_18, spacing.gap_6]}>
        <RNText style={[fonts.w700, fonts.alignCenter]} >
          {V.device_type || " "}
        </RNText>
        <RNView style={[{ borderColor: colors.rgba005, borderWidth: 1, borderStyle: 'dotted' }]} />
        <RNText style={[fonts.w700]} numberOfLines={1} ellipsizeMode="tail">
          {V.title}
        </RNText>
        <RNText style={[fonts.size_14]} numberOfLines={2} ellipsizeMode="tail">
          {V.content}
        </RNText>

        <View style={[layout.row, layout.alignCenter, layout.justifyBetween]}>
          <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
            <Icon name="calendar" color={colors.rgba070} />
            <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
              {V.reg_date}
            </RNText>
          </View>
          <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
            <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
              <Icon name="eyedrop" color={colors.rgba070} />
              <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                {V.device_type}
              </RNText>
            </View>
            <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
              <Icon name="eye" color={colors.rgba070} />
              <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                {V.view_cnt}
              </RNText>
            </View>
          </View>
        </View>
      </TouchRect>
    </RNView>
  )
}
