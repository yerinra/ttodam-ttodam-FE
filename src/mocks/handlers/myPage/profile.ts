import { http, HttpResponse } from 'msw';

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

export type Profile = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  manners: number;
};

export const postProfile = http.post('/post/:postId', async () => {
  return new HttpResponse(null, { status: 201 });
});

export const getProfiles = http.get('/users/profiles', () => {
  return HttpResponse.json(profile);
});
