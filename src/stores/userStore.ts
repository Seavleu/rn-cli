import { IUser } from '@/types/scheme'
import { create } from 'zustand'

type UserStore = {
  userInfo: IUser | null
  setUserInfo: (user: IUser) => void
  removeUserInfo: () => void
}

// zustand 스토어 생성
export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (user: IUser) => set({ userInfo: user }),
  removeUserInfo: () => set({ userInfo: null })
}))
