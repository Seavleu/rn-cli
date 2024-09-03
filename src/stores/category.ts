import { create } from 'zustand'

type Category = {
  category: string
  setCategory: (category: string) => void
}

// zustand 스토어 생성
export const useCategoryStore = create<Category>((set) => ({
  category: 'inspection',
  setCategory: (category: string) => set({ category: category })
}))
