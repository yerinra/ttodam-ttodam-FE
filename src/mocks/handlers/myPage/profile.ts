import { editProfile, profile } from '@/mocks/mockData/mypage/profile';
import { http, HttpResponse } from 'msw';

export type Profile = {
  nickname: string;
  profileImageUrl: string;
  mannerScore: number;
};

export type EditProfile = {
  nickname: string;
  profileImgUrl: string;
  password: null;
  confirmPassword: null;
  location: string;
  phoneNumber: string;
};

// 프로필 조회
export const getProfilesHandler = http.get('/users/profiles', () => {
  return HttpResponse.json(profile);
});

// 프로필 수정 위해 데이터 불러오기
export const getEditProfilesHandler = http.get('/users/profiles/update', async () => {
  return HttpResponse.json(editProfile);
});

// 프로필 수정 완료
export const putEditProfilesHandler = http.put('/users/profiles/update', async () => {
  return HttpResponse.json({
    message: '정상적으로 수정되었습니다.',
  });
});

// 사진 수정
export const postProfileImageHandler = http.post('/users/profiles/image-update', () => {
  return HttpResponse.json({
    message: '정상적으로 수정되었습니다.',
  });
});

// 회원 탈퇴
export const deleteUserHandler = http.delete('/users/withdraw', () => {
  return HttpResponse.json({
    message: '정상적으로 탈퇴되었습니다.',
  });
});
