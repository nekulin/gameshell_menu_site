import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
    leftIcon: 'menu' | 'back';
    title: string;
    showSearchIcon: boolean;
    loadingState: boolean
}

type Action = {
    setHeaderState: (headerState:State) => void;
    setLoadingState: (isLoading: boolean) => void;
}

const useHeaderStore = create<State & Action>()(
    persist(immer((set) => ({

    leftIcon: 'menu',
    title: 'Всё меню',
    showSearchIcon: true,
    loadingState: true,
    
    setHeaderState: (headerState) => {
      set((state) => {
        state.leftIcon = headerState.leftIcon;
        state.title = headerState.title;
        state.showSearchIcon = headerState.showSearchIcon;
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