import { useState, ReactNode } from 'react';

type HeaderState = {
    leftIcon?: 'burger' | 'back';
    title: string;
    showSearchIcon?: boolean;
    setHeaderState: (state: HeaderState) => void;
};

const HeaderContext = createContext<HeaderState | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerState, setHeaderState] = useState<HeaderState>({
    leftIcon: 'burger',
    title: 'Меню',
    showSearchIcon: true,
    setHeaderState: () => {},
});

  return (
    <HeaderContext.Provider value={{ ...headerState, setHeaderState }}>
      <Header {...headerState} />
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
