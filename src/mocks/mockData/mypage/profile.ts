import { EditProfile, Profile } from '@/mocks/handlers/myPage/profile';

export const profile: { profile: Profile[] } = {
  profile: [
    {
      id: 1,
      nickname: '또담',
      profileImgUrl: '',
      manners: 80,
    },
  ],
};

export const editProfile: { editProfile: EditProfile[] } = {
  editProfile: [
    {
      id: 1,
      nickname: '또담',
      profileImgUrl: '',
      password: null,
      confirmPassword: null,
      location: '서울특별시 중구 세종대로 15',
      phoneNumber: '01012341234',
    },
  ],
};
