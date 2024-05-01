import { editProfile, profile } from '@/mocks/mockData/mypage/profile';
import { http, HttpResponse } from 'msw';

export type Profile = {
  nickname: string;
  profileImageUrl: string;
  mannerScore: number;
};

export const postProfilesHandler = http.post('/users/:userId/profiles', async () => {
  return new HttpResponse(null, { status: 200 });
});

export const getProfilesHandler = http.get('/users/profiles', () => {
  return HttpResponse.json(profile);
});

export type EditProfile = {
  nickname: string;
  profileImgUrl: string;
  password: null;
  confirmPassword: null;
  location: string;
  phoneNumber: string;
};

export const putEditProfilesHandler = http.put('/users/profiles/update', async () => {
  return HttpResponse.json({
    message: '정상적으로 수정되었습니다.',
  });
});

export const getEditProfilesHandler = http.get('/users/profiles/update', async () => {
  return HttpResponse.json(editProfile);
});
