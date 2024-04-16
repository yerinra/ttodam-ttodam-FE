import { type UserInfo } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserInfoStore = create(
  persist(
    set => ({
      // 초기 상태
      userInfo: null, // 유저 정보 초기 값은 null

      // 액션: 유저 정보를 업데이트
      setUserInfo: (newUserInfo: UserInfo) =>
        set(() => ({
          userInfo: newUserInfo,
        })),

      // 유저 정보 초기화
      resetUserInfo: () =>
        set(() => ({
          userInfo: null,
        })),
    }),
    {
      name: 'userInfo', // 로컬 스토리지에 저장할 키 이름
      getStorage: () => window.localStorage, // 로컬 스토리지 사용
    },
  ),
);

export default useUserInfoStore;
