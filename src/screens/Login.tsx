import {
  View,
  TextInput,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator
} from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SafeAreaScreen } from '@/components/SafeAreaScreen'
import { RNText, RNView } from '@/components/Custom'
import useTheme from '@/theme/hooks'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Button from '@/components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSWRMutation from 'swr/mutation'
import { post } from '@/services'
import { showToast } from '@/utils'
import { useUserStore } from '@/stores'
import { setToken, getToken, removeToken } from '@/utils/storage'

const Login = () => {
  const { theme, colors, layout, spacing, components, fonts } = useTheme()
  const [isSaveIdChecked, setIsSaveIdChecked] = useState<boolean>(false)
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [pw, setPw] = useState<string>('')
  const { setUserInfo } = useUserStore()

  const { trigger: login, isMutating: loginIsMutating } = useSWRMutation(
    '/api/login/auth',
    post
  )
  const { trigger: autoLogin, isMutating: autoLoginIsMutating } =
    useSWRMutation('/api/login/authAuto', post)

  const handleAutoLogin = async () => {
    const token = await getToken()

    if (!token) return

    try {
      const res = await autoLogin({ sun_q_a_t: token })

      if (res.result + 1) {
        setUserInfo({
          plant_name: res.data.plant_info.plant_name,
          plant_seq: res.data.plant_info.plant_seq,
          user_id: res.data.user_id,
          user_seq: res.data.user_seq
        })
      }
    } catch (e) {
      console.log('Error in handleAutoLogin : ', e)
    }
  }

  const getLoginInfo = async () => {
    const isAutoLogin = await AsyncStorage.getItem('sun_q_auto_login')
    const isSaveId = await AsyncStorage.getItem('sun_q_save_id')

    if (isAutoLogin === 'true') {
      return handleAutoLogin()
    }

    if (isSaveId !== null) {
      setId(isSaveId)
      setIsSaveIdChecked(true)
    }
  }

  useEffect(() => {
    getLoginInfo()
  }, [])

  const logoImgSrc =
    theme === 'dark'
      ? require('@/assets/images/logo_dark.png')
      : require('@/assets/images/logo_light.png')

  const fullLogoImgSrc =
    theme === 'dark'
      ? require('@/assets/images/logo_fullname_dark.png')
      : require('@/assets/images/logo_fullname_light.png')

  const onPressLogin = async () => {
    try {
      const res = await login({ user_id: `${id}`, user_pw: pw })

      if (res.result + 1) {
        if (isSaveIdChecked) {
          await AsyncStorage.setItem('sun_q_save_id', id)
        }

        if (isAutoLoginChecked) {
          await AsyncStorage.setItem(
            'sun_q_auto_login',
            isAutoLoginChecked ? 'true' : 'false'
          )
        }

        await setToken(res.data.token)
        setUserInfo({
          plant_name: res.data.plant_info.plant_name,
          plant_seq: res.data.plant_info.plant_seq,
          user_id: res.data.user_id,
          user_seq: res.data.user_seq
        })
      } else {
        showToast(`⛔ ${res.message}`)
      }
    } catch (e) {
      console.error('Error in onPressLogin : ', e)
    }
  }

  const onChangeInput =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent
      setter(text)
    }

  const CheckBox = ({
    title,
    isChecked,
    setter
  }: {
    title: string
    isChecked: boolean
    setter: Dispatch<SetStateAction<boolean>>
  }) => (
    <View
      style={[layout.row, layout.alignCenter, spacing.gap_8, { width: 100 }]}>
      <BouncyCheckbox
        isChecked={isChecked}
        size={20}
        fillColor={colors.primary}
        unFillColor={colors.background}
        iconStyle={{
          borderColor: colors.primary,
          borderRadius: 5
        }}
        innerIconStyle={{ borderRadius: 5 }}
        text={title}
        textStyle={[
          fonts.size_14,
          fonts.w400,
          fonts.text,
          { textDecorationLine: 'none', marginLeft: -10 }
        ]}
        onPress={(isChecked: boolean) => {
          setter(isChecked)
        }}
      />
    </View>
  )

  return (
    <SafeAreaScreen>
      <RNView
        style={[
          layout.flex_1,
          layout.justifyCenter,
          spacing.p_16,
          spacing.py_30,
          spacing.gap_40
        ]}>
        <View style={[spacing.gap_12]}>
          <Image source={logoImgSrc} style={{ width: 140, height: 24 }} />
          <View>
            <RNText style={[fonts.w700, fonts.size_24]}>
              신재생에너지 EMS 플랫폼
            </RNText>
            <RNText style={[fonts.size_20]}>
              Watch-Q에 오신것을 환영합니다.
            </RNText>
          </View>
        </View>
        <View style={[spacing.gap_14]}>
          <View style={[layout.relative, layout.justifyCenter]}>
            <RNText style={[layout.absolute, fonts.w700, { left: 15 }]}>
              ID
            </RNText>
            <TextInput
              value={id}
              style={[components.input]}
              placeholder="아이디 입력"
              onChange={onChangeInput(setId)}
            />
          </View>
          <View style={[layout.relative, layout.justifyCenter]}>
            <RNText style={[layout.absolute, fonts.w700, { left: 15 }]}>
              PW
            </RNText>
            <TextInput
              style={[components.input]}
              placeholder="비밀번호 입력"
              secureTextEntry={true}
              onChange={onChangeInput(setPw)}
            />
          </View>
          <View style={[layout.row]}>
            <CheckBox
              title="아이디 저장"
              isChecked={isSaveIdChecked}
              setter={setIsSaveIdChecked}
            />
            <CheckBox
              isChecked={isAutoLoginChecked}
              title="자동 로그인"
              setter={setIsAutoLoginChecked}
            />
          </View>
        </View>
        <Button
          title={
            loginIsMutating ? <ActivityIndicator size={'small'} /> : '로그인'
          }
          onPress={onPressLogin}
          disabled={loginIsMutating}
        />
        <View style={[spacing.gap_4]}>
          <Image source={fullLogoImgSrc} style={{ width: 180, height: 24 }} />
          <View>
            <RNText style={[fonts.size_10, fonts.rgba050]}>
              대표자 : 임정민 사업자등록번호 : 142-81-86179{'\n'}TEL :
              061-820-7533 FAX : 070-8230-7533
            </RNText>
            <RNText style={[fonts.size_10, fonts.rgba050]}>
              주소 : 전남 나주시 교육길 13 스마트파크지식산업센터 G동
              208호(본점), 202호(기업부설연구소), 201호(공장){' '}
            </RNText>
            <RNText style={[fonts.size_10, fonts.rgba050]}>
              물류창고 : 경기도 파주시 파평면 파평산로 498-170
            </RNText>
            <RNText style={[fonts.size_10, fonts.rgba050]}>
              Copyright ⓒ 2023 렉스이노베이션 All rights reserved.
            </RNText>
          </View>
        </View>
      </RNView>
    </SafeAreaScreen>
  )
}

export default Login
