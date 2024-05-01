import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type IsLoggedInStoreState = {
  isLoggedIn: boolean;
};
type IsLoggedInStoreActions = {
  setIsLoggedIn: (newIsLoggedIn: boolean) => void;
  resetIsLoggedIn: () => void;
};

const useUserIsLoggedInStore = create<IsLoggedInStoreState & IsLoggedInStoreActions>()(
  persist(
    set => ({
      // 초기 상태
      isLoggedIn: false, // 로그인 상태 초기 값은 false

      // 액션: 로그인 상태를 업데이트
      setIsLoggedIn: (newIsLoggedIn: boolean) =>
        set(() => ({
          isLoggedIn: newIsLoggedIn,
        })),

      // 로그인 상태 초기화
      resetIsLoggedIn: () =>
        set(() => ({
          isLoggedIn: false,
        })),
    }),
    {
      name: 'isLoggedIn', // 로컬 스토리지에 저장할 키 이름
    },
  ),
);

export default useUserIsLoggedInStore;
