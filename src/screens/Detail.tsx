import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AppNavigationParamList,
  AppStackNavigatorProps
} from '@/navigation/AppNavigator'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import useSWR from 'swr'
import { useCategoryStore } from '@/stores/category'
import { del, fetcher } from '@/services'
import { RNText, RNView } from '@/components/Custom'
import useTheme from '@/theme/hooks'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import { TouchCircle } from '@/components/Touch'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomModal from '@/components/CustomModal'
import { ImageSlider } from 'react-native-image-slider-banner'
import useSWRMutation from 'swr/mutation'
import { showToast } from '@/utils'

type DetailProps = {
  route: RouteProp<AppNavigationParamList, 'Detail'>
  navigation: AppStackNavigatorProps
}

const Detail = ({ route, navigation }: DetailProps) => {
  const { layout, fonts, colors, components, spacing } = useTheme()
  const { id } = route.params
  const { category } = useCategoryStore()

  const key = category === 'inspection' 
  ? 'info' : 'data'
  const endPoint =
    category === 'inspection'
      ? `/api/device/inspection?inspection_seq=${id}`
      : `/api/device/error_fix/info?device_error_fix_seq=${id}`

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [files, setFiles] = useState([])

  const { data, isLoading, mutate, error } = useSWR(endPoint, fetcher)
  const { trigger } = useSWRMutation(`/api/device/${category}`, del)

  useEffect(() => {
    if (data) {
      const newFiles = data.data.file_list.map((file: any) => ({
        img: file.file_url
      }))
      setFiles(newFiles)
    }
  }, [data])

  const refreshData = async () => {
    await mutate()
  }

  useFocusEffect(
    useCallback(() => {
      refreshData()
    }, [])
  )

  const handleDeleteBoard = async () => {
    try {
      await trigger(
        category === 'inspection'
          ? { inspection_seq: id }
          : { device_error_fix_seq: id }
      )

      showToast('✅ 게시글이 성공적으로 삭제되었습니다.')
      navigation.goBack()
    } catch (e) {
      console.log('Err in handleDeleteBoard : ', e)
    }
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

  if (!data) {
    showToast('⛔ 이미 삭제된 게시글입니다.')
    return navigation.goBack()
  }

  const Header = () => {
    return (
      <RNView
        style={[
          components.header,
          spacing.gap_10,
          { borderBottomWidth: 1, borderColor: colors.rgba010 }
        ]}>
        <TouchCircle style={[spacing.p_4]} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={25} color={colors.text} />
        </TouchCircle>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RNText style={[fonts.w700, fonts.size_18]}>
            {data.data[key].title}
          </RNText>
        </ScrollView>
        <TouchCircle style={[spacing.p_6]} onPress={() => setIsMenuOpen(true)}>
          <Icon name="ellipsis-vertical" size={20} color={colors.text} />
        </TouchCircle>
      </RNView>
    )
  }
  return (
    <SafeAreaScreen style={{ backgroundColor: colors.background }}>
      <Header />

      <ScrollView>
        <ImageSlider
          data={files}
          caroselImageStyle={{ resizeMode: 'cover' }}
          previewImageContainerStyle={{ backgroundColor: colors.background }}
          indicatorContainerStyle={{ marginBottom: -30 }}
        />

        <View
          style={[
            spacing.p_20,
            {
              borderColor: colors.rgba010,
              borderTopWidth: 1
            }
          ]}>
          <View
            style={[
              layout.row,
              layout.alignCenter,
              layout.justifyBetween,
              spacing.mb_14
            ]}>
            <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
              <Icon name="calendar" color={colors.rgba070} />
              <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                {data.data[key].reg_date}
              </RNText>
            </View>
            <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
              <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                <Icon name="eyedrop" color={colors.rgba070} />
                <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                  {data.data[key].ins_type || data.data[key].device_type}
                </RNText>
              </View>
              <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                <Icon name="eye" color={colors.rgba070} />
                <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                  {data.data[key].view_cnt}
                </RNText>
              </View>
            </View>
          </View>
          <RNText>{data.data[key].content}</RNText>
        </View>
      </ScrollView>

      <CustomModal
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(!isMenuOpen)}>
        <RNView
          style={[
            layout.absolute,
            {
              top: 80,
              right: 20,
              borderRadius: 10
            }
          ]}>
          <TouchableOpacity
            style={[spacing.px_24, spacing.py_16]}
            onPress={() => {
              setIsMenuOpen(false)
              navigation.navigate('AddBoard', { data: data.data })
            }}>
            <RNText>수정</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[spacing.px_24, spacing.py_16]}
            onPress={() => {
              setIsMenuOpen(false)
              setIsDeleteModalOpen(true)
            }}>
            <RNText>삭제</RNText>
          </TouchableOpacity>
        </RNView>
      </CustomModal>
      <CustomModal
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(!isMenuOpen)}
        style={[layout.alignCenter, layout.justifyCenter]}>
        <RNView style={[spacing.p_20, spacing.gap_10, { borderRadius: 8 }]}>
          <RNText>게시글을 정말 삭제 할까요?</RNText>
          <View
            style={[
              layout.row,
              layout.alignCenter,
              layout.justifyCenter,
              spacing.gap_12
            ]}>
            <TouchableOpacity
              onPress={handleDeleteBoard}
              style={[
                spacing.px_40,
                spacing.py_10,
                { borderRadius: 8, backgroundColor: colors.primary }
              ]}>
              <RNText style={[fonts.w700]}>삭제</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                spacing.px_40,
                spacing.py_10,
                { borderRadius: 8, backgroundColor: colors.rgba030 }
              ]}>
              <RNText onPress={() => setIsDeleteModalOpen(false)}>취소</RNText>
            </TouchableOpacity>
          </View>
        </RNView>
      </CustomModal>
    </SafeAreaScreen>
  )
}

export default Detail
