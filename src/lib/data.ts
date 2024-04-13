import React from 'react';

import { LuGrip, LuDog, LuWatch, LuUtensils, LuSalad, LuPencilRuler, LuLamp, LuClover, LuPill } from 'react-icons/lu';

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
