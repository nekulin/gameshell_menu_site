import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
    leftIcon: string;
    title: string;
    showSearchIcon: boolean;
    loadingState: boolean
}

type HeaderState = {
  leftIcon: string;
  title: string;
}

type Action = {
    setHeaderState: (headerState: HeaderState) => void;
    setLoadingState: (isLoading: boolean) => void;
}

const useHeaderStore = create<State & Action>()(
    persist(immer((set) => ({

    leftIcon: 'menu',
    title: 'Всё меню',
    loadingState: true,
    
    setHeaderState: (headerState) => {
      set((state) => {
        state.leftIcon = headerState.leftIcon;
        state.title = headerState.title;
      })
    },

    setLoadingState: (isLoading) => {
        set((state) => {
          state.loadingState = isLoading;
        });
    },

    })),
    
      {
        name: 'zustand-store',
      }
    )
);

export default useHeaderStore;