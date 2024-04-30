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
  { type: 'HEALTH', name: '헬스/건강식품', icon: React.createElement(LuPill) },
  { type: 'OFFICE', name: '문구/오피스', icon: React.createElement(LuPencilRuler) },
  { type: 'PET', name: '반려동물용품', icon: React.createElement(LuDog) },
  { type: 'OTHER', name: '기타', icon: React.createElement(LuClover) },
] as const;

export const STATUS = [
  { type: 'ALL', name: '전체' },
  { type: 'IN_PROGRESS', name: '모집중' },
  { type: 'COMPLETED', name: '모집완료' },
  { type: 'FAILED', name: '모집실패' },
] as const;

export const SORT_OPTIONS = [
  { type: 'createdAt', name: '최신순' },
  { type: 'title', name: '제목순' },
] as const;
