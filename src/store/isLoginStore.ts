import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserIsLogInStore = create(
  persist(
    set => ({
      // 초기 상태
      isLogIn: false, // 로그인 상태 초기 값은 false

      // 액션: 로그인 상태를 업데이트
      setIsLogIn: (newIsLogIn: boolean) =>
        set(() => ({
          isLogIn: newIsLogIn,
        })),

      // 로그인 상태 초기화
      resetIsLogIn: () =>
        set(() => ({
          isLogIn: false,
        })),
    }),
    {
      name: 'isLogin', // 로컬 스토리지에 저장할 키 이름
      getStorage: () => window.localStorage, // 로컬 스토리지 사용
    },
  ),
);

export default useUserIsLogInStore;
