import React from 'react';
import mapPin from '@/assets/landing/map-pin.png';
import location from '@/assets/landing/location.png';
import bookmark from '@/assets/landing/bookmark.png';
import chat from '@/assets/landing/chat.png';
import star from '@/assets/landing/star.png';

import { LuGrip, LuDog, LuWatch, LuUtensils, LuSalad, LuPencilRuler, LuLamp, LuClover, LuPill } from 'react-icons/lu';
import { CiHome, CiShoppingBasket, CiChat1, CiBullhorn, CiUser } from 'react-icons/ci';

export const LANDING_PAGE_DATA = [
  {
    img: mapPin,
    title: '동네 사람들과 함께하는 구매!',
    desc: '당신이 원하는 상품을 지금 찾아보세요.',
    color: 'bg-primary/70',
  },
  {
    img: location,
    title: '내 주소를 기반으로 한 장소 검색',
    desc: '동네에서 올라온 글을 확인하세요.',
    color: 'bg-slate-400/80',
  },
  {
    img: bookmark,
    title: '고민이 되시나요?',
    desc: '글을 북마크해서 나중에 다시 확인할 수 있어요.',
    color: 'bg-green-600/80',
  },
  {
    img: star,
    title: '함께 한 회원들을 평가',
    desc: '매너 평가를 통해 더 나은 커뮤니티를 만들어가요.',
    color: 'bg-yellow-400/80',
  },
  {
    img: chat,
    title: '채팅으로 소통',
    desc: '편하게 채팅으로 소통하세요!',
    color: 'bg-red-300/80',
  },
] as const;

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

export const PURCHASE_STATUS_OPTIONS = [
  { type: 'PREPARING', label: '준비중' },
  { type: 'PROCEEDING', label: '진행중' },
  { type: 'SUCCESS', label: '구매완료' },
  { type: 'FAILURE', label: '구매실패' },
] as const;

export const SORT_OPTIONS = [
  { type: 'createdAt', name: '최신순' },
  { type: 'title', name: '제목순' },
] as const;

export const PROFILE_NAVIGATION_LINKS = [
  { label: '참여내역', path: '/my/history' },
  { label: '북마크', path: '/my/bookmark' },
  { label: '키워드', path: '/my/keyword' },
  { label: '내가 쓴 글', path: '/my/posts' },
] as const;
