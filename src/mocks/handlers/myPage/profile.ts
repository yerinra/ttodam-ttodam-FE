import { profile } from '@/mocks/mockData/mypage/profile';
import { http, HttpResponse } from 'msw';

export type Profile = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  manners: number;
};

export const postProfilesHandler = http.post('/post/:postId/profiles', async () => {
  return new HttpResponse(null, { status: 201 });
});

export const getProfilesHandler = http.get('/users/profiles', () => {
  return HttpResponse.json(profile);
});
