import { Spacing } from '@/types/theme'
import { sizes } from './_config'

export const generateSpacing = sizes.reduce((acc, size) => {
  return Object.assign(acc, {
    [`m_${size}`]: {
      margin: size
    },
    [`mb_${size}`]: {
      marginBottom: size
    },
    [`mt_${size}`]: {
      marginTop: size
    },
    [`mr_${size}`]: {
      marginRight: size
    },
    [`ml_${size}`]: {
      marginLeft: size
    },
    [`my_${size}`]: {
      marginVertical: size
    },
    [`mx_${size}`]: {
      marginHorizontal: size
    },
    [`p_${size}`]: {
      padding: size
    },
    [`pb_${size}`]: {
      paddingBottom: size
    },
    [`pt_${size}`]: {
      paddingTop: size
    },
    [`pr_${size}`]: {
      paddingRight: size
    },
    [`pl_${size}`]: {
      paddingLeft: size
    },
    [`py_${size}`]: {
      paddingVertical: size
    },
    [`px_${size}`]: {
      paddingHorizontal: size
    },
    [`gap_${size}`]: {
      gap: size
    }
  })
}, {} as Spacing)
