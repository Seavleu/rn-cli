import useTheme from '@/theme/hooks'
import { showToast } from '@/utils'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from './Button'
import { RNText, RNView } from './Custom'
import { useUserStore } from '@/stores'
import useSWRMutation from 'swr/mutation'
import { del, post, put, upload } from '@/services'
import { useNavigation } from '@react-navigation/native'

export const AddInspection = ({ data }: { data?: any }) => {
  const navigation = useNavigation()
  const { layout, fonts, colors, spacing, components } = useTheme()
  const { userInfo } = useUserStore()

  const { trigger: saveInspection, isMutating: saveInspectionIsMutating } =
    useSWRMutation('/api/device/inspection', post)
  const { trigger: updateInspection } = useSWRMutation(
    '/api/device/inspection',
    put
  )

  const { trigger: saveImage } = useSWRMutation(
    '/file/upload?mid_path=inspection',
    upload
  )

  const { trigger: deleteImage } = useSWRMutation('/file/delete', del)

  const [title, setTitle] = useState<string>(data?.info.title || '')
  const [content, setContent] = useState<string>(data?.info.content || '')
  const [type, setType] = useState<string>(data?.info.ins_type || '정기점검')
  const [files, setFiles] = useState<any[]>(data?.file_list || [])

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
      const newFileSeqList = files.map((file) => file.attached_file_seq)

      const req = {
        ins_type: type,
        title: title,
        content: content,
        file_seq_list: String(newFileSeqList),
        plant_seq: userInfo?.plant_seq,
        reg_user_seq: userInfo?.user_seq
      }

      if (data) {
        Object.assign(req, { inspection_seq: data.info.inspection_seq })
      }

      const res = !data
        ? await saveInspection(req)
        : await updateInspection(req)

      console.log(res)
      if (res.data.success === 'true') {
        showToast(
          data
            ? '✅ 정기점검 수정이 완료되었습니다.'
            : '✅ 정기점검 등록이 완료되었습니다.'
        )
        navigation.goBack()
      }
    } catch (e) {
      console.log('Err in onPress : ', e)
    }
  }

  const valldation = title.length !== 0 && content.length !== 0

  return (
    <RNView style={[layout.flex_1]}>
      <ScrollView contentContainerStyle={[spacing.p_14]}>
        <View style={[spacing.gap_6, spacing.mb_12]}>
          <RNText style={[fonts.size_14]}>점검유형 선택</RNText>
          <View
            style={[
              {
                borderWidth: 1,
                borderColor: colors.text,
                borderRadius: 8
              }
            ]}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}>
              <Picker.Item label="정기점검" value="정기점검" />
              <Picker.Item label="비정기점검" value="비정기점검" />
            </Picker>
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
          <View style={[layout.row, layout.alignCenter, layout.justifyBetween]}>
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
          saveInspectionIsMutating ? (
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
  )
}

export const AddErrorFix = ({ data }: { data?: any }) => {
  const { layout, fonts, spacing } = useTheme()
  return <RNView style={[layout.flex_1]}></RNView>
}
