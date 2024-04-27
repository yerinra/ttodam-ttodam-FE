import { editProfile, profile } from '@/mocks/mockData/mypage/profile';
import { http, HttpResponse } from 'msw';

export type Profile = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  manners: number;
};

export const postProfilesHandler = http.post('/users/:userId/profiles', async () => {
  return new HttpResponse(null, { status: 200 });
});

export const getProfilesHandler = http.get('/users/profiles', () => {
  return HttpResponse.json(profile);
});

export type EditProfile = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  password: null;
  confirmPassword: null;
  location: string;
  phoneNumber: string;
};

export const postEditProfilesHandler = http.post('/users/:userId/profiles/update', async () => {
  return new HttpResponse(null, { status: 200 });
});

export const getEditProfilesHandler = http.get('/users/profiles/update', async () => {
  return HttpResponse.json(editProfile);
});
