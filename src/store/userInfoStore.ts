import { type UserInfo } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserInfoState = {
  userInfo: UserInfo | null;
  setUserInfo: (newUserInfo: UserInfo) => void;
  resetUserInfo: () => void;
};

const useUserInfoStore = create<UserInfoState>()(
  persist(
    set => ({
      // 초기 상태
      userInfo: {
        id: 1,
        nickname: '익명의유저2',
        profileImgUrl:
          'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
        manners: 5,
      }, // 임시 유저
      // 유저 정보 초기 값은 null
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
    },
  ),
);

export default useUserInfoStore;
