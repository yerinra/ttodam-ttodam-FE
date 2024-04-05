import React from 'react';

import { LuGrip, LuDog, LuWatch, LuUtensils, LuSalad, LuPencilRuler, LuLamp, LuClover, LuPill } from 'react-icons/lu';

export const CATEGORIES = [
  { type: 'all', name: '전체', icon: React.createElement(LuGrip) },
  { type: 'life', name: '생활용품', icon: React.createElement(LuLamp) },
  { type: 'kitchen', name: '주방용품', icon: React.createElement(LuUtensils) },
  { type: 'food', name: '식품', icon: React.createElement(LuSalad) },
  { type: 'fashion', name: '의류/잡화', icon: React.createElement(LuWatch) },
  { type: 'health', name: '헬스/건강', icon: React.createElement(LuPill) },
  { type: 'stationery', name: '문구/오피스', icon: React.createElement(LuPencilRuler) },
  { type: 'pet', name: '반려동물', icon: React.createElement(LuDog) },
  { type: 'etc', name: '기타', icon: React.createElement(LuClover) },
] as const;
