import {
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  AppNavigationParamList,
  AppStackNavigatorProps
} from '@/navigation/AppNavigator'
import { RouteProp } from '@react-navigation/native'
import useTheme from '@/theme/hooks'
import { RNText, RNView } from '@/components/Custom'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchCircle } from '@/components/Touch'
import { useCategoryStore } from '@/stores/category'
import { post, put, upload, del, fetcher } from '@/services'
import { useUserStore } from '@/stores'
import { showToast } from '@/utils'
import useSWRMutation from 'swr/mutation'
import ImagePicker from 'react-native-image-crop-picker'
import Button from '@/components/Button'
import { Picker } from '@react-native-picker/picker'
import useSWR from 'swr'

type AddBoardProps = {
  route: RouteProp<AppNavigationParamList, 'AddBoard'>
  navigation: AppStackNavigatorProps
}

const AddBoard = ({ route, navigation }: AddBoardProps) => {
  const { colors, fonts, layout, spacing, components } = useTheme()
  const { category } = useCategoryStore()
  const { userInfo } = useUserStore()
  const { data } = route.params

  const isInspection = category === 'inspection'
  const key = isInspection ? 'info' : 'data'

  const { data: errorFixTitleList } = useSWR(
    `/api/device/error_fix/title_list?plant_seq=${userInfo?.plant_seq}`,
    fetcher
  )

  const { trigger: save, isMutating: saveIsMutating } = useSWRMutation(
    `/api/device/${category}`,
    post
  )

  const { trigger: update } = useSWRMutation(`/api/device/${category}`, put)
  const { trigger: saveImage } = useSWRMutation(
    `/file/upload?mid_path=${category}`,
    upload
  )

  const { trigger: deleteImage } = useSWRMutation('/file/delete', del)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [type, setType] = useState<string | number>(
    isInspection ? '정기점검' : errorFixTitleList?.data.list[0]
  )
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      setTitle(data[key].title)
      setContent(data[key].content)
      setType(isInspection ? data[key].ins_type : data[key].device_error_seq)
      setFiles(data.file_list)
    }
  }, [data])

  const openImagePicker = async () => {
    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: true
      })

      const totalImagesCount = files.length + selectedImages.length
      if (totalImagesCount > 10) {
        return showToast('⛔ 10장까지 등록 가능합니다.')
      }

      selectedImages.forEach(async (image, index) => {
        const res = await handleSaveImage(image, index)
        if (res) {
          setFiles((prev) => [...prev, res])
        }
      })
    } catch (error) {
      showToast('⛔ 이미지 등록 실패')
    }
  }

  const removeImage = async (seq: any) => {
    try {
      await deleteImage({ attached_file_seq: seq })
      const newFileList = files.filter((item) => item.attached_file_seq !== seq)
      setFiles(newFileList)
    } catch (e) {
      console.log('Err in removeImage : ', e)
    }
  }

  const handleSaveImage = async (image: any, index: number) => {
    try {
      const formData = new FormData()
      formData.append('file', {
        uri: image.path,
        name: `${image.modificationDate + index}.jpg`,
        type: image.mime
      })
      const res = await saveImage(formData)

      if (res) {
        return res.data
      }
    } catch (e) {
      console.log('Err in handleSaveImage : ', e)
    }
  }

  const onPress = async () => {
    try {
      const req = createRequestData()
      const res = data ? await update(req) : await save(req)

      if (res.data.success === 'true') {
        showToast(
          data
            ? '✅ 정기점검 수정이 완료되었습니다.'
            : '✅ 정기점검 등록이 완료되었습니다.'
        )
        navigation.navigate('History')
      }
    } catch (e) {
      console.log('Err in onPress : ', e)
    }
  }

  const createRequestData = () => {
    const newFileSeqList = files.map((file) => file.attached_file_seq)

    const req: any = {
      title,
      content,
      file_seq_list: newFileSeqList.join(','),
      plant_seq: userInfo?.plant_seq,
      reg_user_seq: userInfo?.user_seq,

      ...(isInspection ? { ins_type: type } : { device_error_seq: type })
    }

    if (data) {
      Object.assign(
        req,

        isInspection
          ? { inspection_seq: data.info.inspection_seq }
          : { device_error_fix_seq: data.data.device_error_fix_seq }
      )
    }

    return req
  }

  const valldation = title.length !== 0 && content.length !== 0

  const Header = () => {
    return (
      <RNView
        style={[
          components.header,
          { borderBottomWidth: 1, borderColor: colors.rgba010 }
        ]}>
        <View style={[layout.row, layout.alignCenter, spacing.gap_10]}>
          <TouchCircle
            style={[spacing.p_4]}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={25} color={colors.text} />
          </TouchCircle>
          <RNText style={[fonts.w700, fonts.size_18]}>
            {data
              ? isInspection
                ? '정기점검 수정'
                : '문제조치 수정'
              : isInspection
              ? '정기점검 등록'
              : '문제조치 등록'}
          </RNText>
        </View>
      </RNView>
    )
  }
  return (
    <SafeAreaScreen>
      <Header />

      <RNView style={[layout.fullHeight, layout.flex_1]}>
        <ScrollView contentContainerStyle={[spacing.p_14]}>
          <View style={[spacing.gap_6, spacing.mb_12]}>
            <RNText style={[fonts.size_14]}>
              {isInspection ? '점검 유형 선택' : '문제조치 유형 선택'}
            </RNText>

            {/* Rendering modal */}
            
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: colors.text,
                  borderRadius: 8,
                  height: 50,
                  justifyContent: 'center'
                }
              ]}> 
              {isInspection ? (
                <Picker
                  selectedValue={type}
                  onValueChange={(itemValue) => setType(itemValue)}>
                  <Picker.Item label="정기점검" value="정기점검" />
                  <Picker.Item label="비정기점검" value="비정기점검" />
                </Picker>
              ) : (
                <Picker
                  selectedValue={type}
                  onValueChange={(itemValue) => setType(itemValue)}>
                  {errorFixTitleList?.data.list.map((item: any) => (
                    <Picker.Item
                      key={item.device_error_seq}
                      label={item.title}
                      value={item.device_error_seq}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View style={[spacing.gap_6, spacing.mb_12]}>
            <RNText style={[fonts.size_14]}>제목</RNText>
            <TextInput
              style={[components.input, spacing.pl_10]}
              onChangeText={(text) => setTitle(text)}
              value={title}
              placeholder="제목을 입력해 주세요."
            />
          </View>
          <View style={[spacing.gap_6, spacing.mb_12]}>
            <RNText style={[fonts.size_14]}>내용</RNText>
            <TextInput
              multiline
              numberOfLines={6}
              maxLength={400}
              onChangeText={(text) => setContent(text)}
              value={content}
              placeholder="내용을 입력해 주세요."
              style={{
                fontSize: 16,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.text,
                borderRadius: 8,
                textAlignVertical: 'top'
              }}
            />
          </View>

          <View style={[spacing.gap_6, spacing.mb_12]}>
            <View style={[layout.row, layout.alignEnd, layout.justifyBetween]}>
              <RNText style={[fonts.size_14]}>이미지 등록</RNText>
              <RNText style={[fonts.size_12, fonts.rgba080]}>
                등록된 이미지 : {files.length}
              </RNText>
            </View>

            <ScrollView horizontal style={[spacing.my_10]}>
              {files.map((V, idx) => (
                <View key={V.attached_file_seq}>
                  <Image
                    source={{ uri: V.file_url }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.rgba080,
                      marginLeft: idx !== 0 ? 10 : 0
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(V.attached_file_seq)}
                    style={[
                      layout.absolute,
                      spacing.p_4,
                      {
                        right: 3,
                        top: 3,
                        borderRadius: 99,
                        backgroundColor: '#202020'
                      }
                    ]}>
                    <Icon name="close" size={15} color={colors.text} />
                  </TouchableOpacity>
                </View>
              ))}

              {files.length < 10 && (
                <TouchableOpacity
                  onPress={openImagePicker}
                  style={[
                    {
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: colors.rgba080,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: files.length > 0 ? 10 : 0
                    }
                  ]}>
                  <Icon name="add" size={50} color={colors.rgba080} />
                </TouchableOpacity>
              )}
            </ScrollView>
            <RNText style={[fonts.size_12, fonts.rgba080]}>
              이미지는 JPEG, JPG, PNG만 가능하며{'\n'}최대 10개 까지 첨부
              가능합니다.
            </RNText>
          </View>
        </ScrollView>
        <Button
          title={
            saveIsMutating ? (
              <ActivityIndicator size={'small'} />
            ) : data ? (
              '수정하기'
            ) : (
              '등록하기'
            )
          }
          onPress={onPress}
          disabled={!valldation}
          style={{ borderRadius: 0 }}
        />
      </RNView>
    </SafeAreaScreen>
  )
}

export default AddBoard
