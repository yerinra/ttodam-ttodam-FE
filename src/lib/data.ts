import React from 'react';

import { LuGrip, LuDog, LuWatch, LuUtensils, LuSalad, LuPencilRuler, LuLamp, LuClover, LuPill } from 'react-icons/lu';
import { postPreview } from './types';

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

export const postData: postPreview[] = [
  {
    id: 1,
    title: '휴지 같이 사요',
    content: '휴지 같이 사실 분을 구합니다. 요청 주세요!',
    category: 'kitchen',
    product_name: ['휴지 10개입'],
    price: 10000,
    original_price: 20000,
    participants: 2,
    recruit_status: 'RECRUITING',
  },
  {
    id: 2,
    title: '칫솔 치약 같이 사실 분 모집',
    content: '칫솔, 치약 같이 사실 분을 구합니다.',
    category: 'life',
    product_name: ['칫솔 10개입', '치약 1개'],
    price: 20000,
    original_price: 30000,
    participants: 3,
    recruit_status: 'RECRUITED',
  },
];
