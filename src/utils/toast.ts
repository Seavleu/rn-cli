import Toast from 'react-native-toast-message'

export const showToast = (text: string) => {
  Toast.show({
    type: 'customToast',
    text1: text,
    position: 'bottom',
    visibilityTime: 3000
  })
}
