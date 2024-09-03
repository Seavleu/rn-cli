import AsyncStorage from '@react-native-async-storage/async-storage'

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('sun_q_token', token)
}

export const getToken = async () => await AsyncStorage.getItem('sun_q_token')

export const removeToken = async () =>
  await AsyncStorage.removeItem('sun_q_token')
