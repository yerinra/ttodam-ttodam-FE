import React from 'react';

import { LuGrip, LuDog, LuWatch, LuUtensils, LuSalad, LuPencilRuler, LuLamp, LuClover, LuPill } from 'react-icons/lu';
import { CiHome, CiShoppingBasket, CiChat1, CiBullhorn, CiUser } from 'react-icons/ci';

export const NAVIGATION = [
  { path: '/home', label: '홈', icon: React.createElement(CiHome) },
  { path: '/posts/all', label: '또담공구', icon: React.createElement(CiShoppingBasket) },
  { path: '/chat', label: '채팅', icon: React.createElement(CiChat1) },
  { path: '/notification', label: '알림', icon: React.createElement(CiBullhorn) },
  { path: '/my/profile', label: '대시보드', icon: React.createElement(CiUser) },
] as const;

export const CATEGORIES = [
  { type: 'ALL', name: '전체', icon: React.createElement(LuGrip) },
  { type: 'DAILY', name: '생활용품', icon: React.createElement(LuLamp) },
  { type: 'KITCHEN', name: '주방용품', icon: React.createElement(LuUtensils) },
  { type: 'FOOD', name: '식품', icon: React.createElement(LuSalad) },
  { type: 'CLOTHING', name: '의류/잡화', icon: React.createElement(LuWatch) },
  { type: 'HEALTH', name: '헬스/건강', icon: React.createElement(LuPill) },
  { type: 'OFFICE', name: '문구/오피스', icon: React.createElement(LuPencilRuler) },
  { type: 'PET', name: '반려동물', icon: React.createElement(LuDog) },
  { type: 'OTHER', name: '기타', icon: React.createElement(LuClover) },
] as const;

export const STATUS = [
  { type: 'all', name: '전체' },
  { type: 'in_progress', name: '모집중' },
  { type: 'completed', name: '모집완료' },
  { type: 'failed', name: '모집실패' },
] as const;

export const SORT_OPTIONS = [
  { type: 'createAt', name: '최신순' },
  { type: 'title', name: '제목순' },
] as const;

const KAKAO_LOGIN_KEY = import.meta.env.VITE_KAKAO_LOGIN_API_KEY;
export const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_LOGIN_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_LOGIN_KEY = import.meta.env.VITE_GOOGLE_LOGIN_API_KEY;
export const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_LOGIN_REDIRECT;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?
client_id=${GOOGLE_LOGIN_KEY}
&redirect_uri=${GOOGLE_REDIRECT_URI}
&response_type=code
&scope=https://www.googleapis.com/auth/indexing`;
