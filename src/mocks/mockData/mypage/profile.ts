import { EditProfile, Profile } from '@/mocks/handlers/myPage/profile';

export const profile: { profile: Profile[] } = {
  profile: [
    {
      nickname: '플레임',
      profileImageUrl: '',
      mannerScore: 5,
    },
  ],
};

export const editProfile: { editProfile: EditProfile[] } = {
  editProfile: [
    {
      nickname: '플레임',
      profileImgUrl: '',
      password: null,
      confirmPassword: null,
      location: '서울특별시 중구 세종대로 15',
      phoneNumber: '01012341234',
    },
  ],
};
