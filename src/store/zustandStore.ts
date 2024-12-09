import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  categoryTabsId: number
  openMenu: boolean
}

type Action = {
  setCategoryTabsId: (newId:number) => void
  setOpenMenu: (newStatus:boolean) => void
}

const useZustandStore = create<State & Action>()(
    persist(immer((set) => ({


    // id-шник, который будет записываться в записимости от того - какая категория товаров на экране (через хук useIntersectionObserver)
    categoryTabsId: 0,  
    setCategoryTabsId: (newId) => {
      set((state) => {
        state.categoryTabsId = newId
      })
    },

    openMenu: false,
    setOpenMenu: (newStatus) => {
      set((state) => {
        state.openMenu = newStatus
      })
    },

    })),
    
      {
        name: 'zustand-store',
      }
    )
);

export default useZustandStore;