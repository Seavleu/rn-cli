import { ViewStyle } from 'react-native'

export default {
  col: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignStretch: {
    alignItems: 'stretch'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyAround: {
    justifyContent: 'space-around'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },

  // Sizes Layouts
  flex_1: {
    flex: 1
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },

  // Positions
  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute'
  },
  top0: {
    top: 0
  },
  bottom0: {
    bottom: 0
  },
  left0: {
    left: 0
  },
  right0: {
    right: 0
  },
  z1: {
    zIndex: 1
  },
  z10: {
    zIndex: 10
  }
} as const satisfies Record<string, ViewStyle>
