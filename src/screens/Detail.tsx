import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useState } from 'react'
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

  const key = category === 'inspection' ? 'info' : 'data'
  const endPoint =
    category === 'inspection'
      ? `/api/device/inspection?inspection_seq=${id}`
      : `/api/device/error_fix/info?device_error_fix_seq=${id}`

  const [modalState, setModalState] = useState({
    isMenuOpen: false,
    isDeleteModalOpen: false
  })
  const [deleting, setDeleting] = useState(false)

  // Fetching data
  const { data, isLoading, mutate, error } = useSWR(endPoint, fetcher)
  const { trigger } = useSWRMutation(`/api/device/${category}`, del)

  // Automatically refresh data on screen focus
  useFocusEffect(
    useCallback(() => {
      mutate()
    }, [mutate])
  )

  const getKeyForCategory = () => {
    return category === 'inspection'
      ? { inspection_seq: id }
      : { device_error_fix_seq: id }
  }

  const handleDeleteBoard = async () => {
    try {
      setDeleting(true)
      await trigger(getKeyForCategory())
      showToast('✅ 게시글이 성공적으로 삭제되었습니다.')
      navigation.goBack()
    } catch (e) {
      console.log('Error in handleDeleteBoard: ', e)
    } finally {
      setDeleting(false)
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

  if (error || !data) {
    showToast('⛔ 이미 삭제된 게시글이거나 데이터를 불러올 수 없습니다.')
    return navigation.goBack()
  }

  const Header = () => (
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
          {data.data[key]?.title || '제목 없음'}
        </RNText>
      </ScrollView>
      <TouchCircle
        style={[spacing.p_6]}
        onPress={() => setModalState((prev) => ({ ...prev, isMenuOpen: true }))}
      >
        <Icon name="ellipsis-vertical" size={20} color={colors.text} />
      </TouchCircle>
    </RNView>
  )

  return (
    <SafeAreaScreen style={{ backgroundColor: colors.background }}>
      <Header />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageSlider
          data={data?.data?.file_list.map((file: any) => ({
            img: file.file_url
          }))}
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
                {data.data[key]?.reg_date || '날짜 없음'}
              </RNText>
            </View>
            <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
              <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                <Icon name="eyedrop" color={colors.rgba070} />
                <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                  {data.data[key]?.ins_type || data.data[key]?.device_type || '유형 없음'}
                </RNText>
              </View>
              <View style={[layout.row, layout.alignCenter, spacing.gap_4]}>
                <Icon name="eye" color={colors.rgba070} />
                <RNText style={[fonts.size_10, fonts.w300, fonts.rgba070]}>
                  {data.data[key]?.view_cnt || 0}
                </RNText>
              </View>
            </View>
          </View>
          <RNText>{data.data[key]?.content || '내용 없음'}</RNText>
        </View>
      </ScrollView>

      {/* Menu Modal */}
      <CustomModal
        visible={modalState.isMenuOpen}
        onClose={() =>
          setModalState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
        }>
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
              setModalState((prev) => ({ ...prev, isMenuOpen: false }))
              navigation.navigate('AddBoard', { data: data.data })
            }}>
            <RNText>수정</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[spacing.px_24, spacing.py_16]}
            onPress={() => {
              setModalState((prev) => ({ ...prev, isMenuOpen: false }))
              setModalState((prev) => ({ ...prev, isDeleteModalOpen: true }))
            }}>
            <RNText>삭제</RNText>
          </TouchableOpacity>
        </RNView>
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        visible={modalState.isDeleteModalOpen}
        onClose={() =>
          setModalState((prev) => ({ ...prev, isDeleteModalOpen: false }))
        }
        style={[layout.alignCenter, layout.justifyCenter]}>
        <RNView style={[spacing.p_20, spacing.gap_10, { borderRadius: 8 }]}>
          <RNText>게시글을 정말 삭제할까요?</RNText>
          <View
            style={[
              layout.row,
              layout.alignCenter,
              layout.justifyCenter,
              spacing.gap_12
            ]}>
            <TouchableOpacity
              onPress={handleDeleteBoard}
              disabled={deleting}
              style={[
                spacing.px_40,
                spacing.py_10,
                { borderRadius: 8, backgroundColor: colors.primary }
              ]}>
              <RNText style={[fonts.w700]}>{deleting ? '삭제 중...' : '삭제'}</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                spacing.px_40,
                spacing.py_10,
                { borderRadius: 8, backgroundColor: colors.rgba030 }
              ]}>
              <RNText onPress={() => setModalState((prev) => ({ ...prev, isDeleteModalOpen: false }))}>
                취소
              </RNText>
            </TouchableOpacity>
          </View>
        </RNView>
      </CustomModal>
    </SafeAreaScreen>
  )
}

export default Detail
