import { RNText, RNView } from '@/components/Custom'
import CustomModal from '@/components/CustomModal'
import { ErrorFix, Inspection } from '@/components/HistoryList'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import { TouchCircle, TouchRect } from '@/components/Touch'
import { AppStackNavigatorProps } from '@/navigation/AppNavigator'
import { fetcher } from '@/services'
import { useUserStore } from '@/stores'
import { useCategoryStore } from '@/stores/category'
import useTheme from '@/theme/hooks'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import useSWR from 'swr'

type HistoryProps = {
  navigation: AppStackNavigatorProps
}

const History = ({ navigation }: HistoryProps) => {
  const { layout, fonts, colors, components, spacing } = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [searchData, setSearchData] = useState({
    query_search: 'title',
    query_value: ''
  })

  const { category, setCategory } = useCategoryStore()
  const { userInfo } = useUserStore()

  const queryString = `plant_seq=${userInfo?.plant_seq}&query_search=${searchData.query_search}&query_value=${searchData.query_value}&page=${page}`
  const { data, isLoading, mutate } = useSWR(
    `/api/device/${category}/list?${queryString}`,
    fetcher
  )

  const getMoreData = async () => {
    console.log('더보기')
  }

  const getData = async () => {
    await mutate()
  }

  useEffect(() => {
    getData()
  }, [category])

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  const onPressCategory = (category: string) => {
    setModalVisible(false)
    setCategory(category)
  }

  const Header = () => {
    return (
      <RNView
        style={[
          components.header,
          { borderBottomWidth: 1, borderColor: colors.rgba010 }
        ]}>
        <TouchRect
          style={[layout.row, layout.alignCenter, spacing.gap_4, spacing.p_4]}
          onPress={() => setModalVisible(true)}>
          <RNText style={[fonts.w700, fonts.size_18]}>
            {category === 'inspection' ? '정기점검' : '문제조치'}
          </RNText>
          <Icon name="chevron-down" size={20} color={colors.text} />
        </TouchRect>
        <View style={[layout.row, layout.alignCenter, spacing.gap_6]}>
          <TouchCircle
            style={[spacing.p_4]}
            onPress={() => setSearchModalVisible(true)}>
            <Icon name="search" size={25} color={colors.text} />
          </TouchCircle>
          <TouchCircle style={[spacing.p_4]}>
            <Icon
              name="person-circle"
              size={28}
              color={colors.text}
              onPress={() => navigation.navigate('UserInfo')}
            />
          </TouchCircle>
        </View>
      </RNView>
    )
  }

  if (isLoading) {
    return (
      <RNView
        style={[
          layout.fullHeight,
          layout.fullWidth,
          layout.alignCenter,
          layout.justifyCenter
        ]}>
        <ActivityIndicator size={'large'} />
      </RNView>
    )
  }

  return (
    <SafeAreaScreen>
      <Header />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true)
              await mutate()
              setRefreshing(false)
            }}
          />
        }>
        {category === 'inspection'
          ? data?.data.list.map((V: any) => (
              <Inspection
                key={V.inspection_seq}
                V={V}
                navigation={navigation}
              />
            ))
          : data?.data.list
              .slice()
              .reverse()
              .map((V: any) => (
                <ErrorFix
                  key={V.device_error_fix_seq}
                  V={V}
                  navigation={navigation}
                />
              ))}
        <TouchRect
          onPress={getMoreData}
          style={[
            layout.row,
            layout.alignCenter,
            layout.justifyCenter,
            spacing.gap_4,
            spacing.m_10,
            spacing.p_10,
            {
              borderWidth: 1,
              borderColor: colors.text,
              borderRadius: 10,
              backgroundColor: colors.background
            }
          ]}>
          <Icon name="search-sharp" size={20} color={colors.text} />
          <RNText style={[fonts.w700]}>더보기</RNText>
        </TouchRect>
      </ScrollView>

      <TouchCircle
        onPress={() => navigation.navigate('AddBoard', { data: undefined })}
        style={[
          layout.absolute,
          spacing.p_10,
          { bottom: 40, right: 20, backgroundColor: colors.primary }
        ]}>
        <Icon name="add" size={40} color={'#fff'} />
      </TouchCircle>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <RNView
          style={[
            layout.absolute,
            {
              width: 150,
              top: 85,
              left: 10,
              borderRadius: 10
            }
          ]}>
          <TouchableOpacity
            onPress={() => onPressCategory('inspection')}
            style={[spacing.p_16]}>
            <RNText>정기점검</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressCategory('error_fix')}
            style={[spacing.p_16]}>
            <RNText>문제조치</RNText>
          </TouchableOpacity>
        </RNView>
      </CustomModal>
    </SafeAreaScreen>
  )
}

export default History
