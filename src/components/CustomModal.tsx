import { Modal, TouchableOpacity } from 'react-native'
import { ReactNode } from 'react'
import useTheme from '@/theme/hooks'

type CustomModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
  style?: any
}

const CustomModal = ({
  visible,
  onClose,
  children,
  style
}: CustomModalProps) => {
  const { layout } = useTheme()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={[
          layout.flex_1,
          layout.fullWidth,
          layout.fullHeight,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          style
        ]}
        activeOpacity={1}
        onPressOut={onClose}>
        {children}
      </TouchableOpacity>
    </Modal>
  )
}

export default CustomModal
