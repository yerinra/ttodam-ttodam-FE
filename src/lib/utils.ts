import { Category } from '@/types/post';
import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
}

export function categoryNameKR(category: Exclude<Category, 'ALL'>) {
  const categoryMap: { [key in Exclude<Category, 'ALL'>]: string } = {
    DAILY: '생활용품',
    KITCHEN: '주방용품',
    FOOD: '식품',
    CLOTHING: '의류/잡화',
    HEALTH: '헬스/건강식품',
    OFFICE: '문구/오피스',
    PET: '반려동물용품',
    OTHER: '기타',
  };

  return categoryMap[category] || category;
}

const priceFormat = new Intl.NumberFormat('ko-KR', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

export const toPriceFormat = (value: number) => priceFormat.format(value);

export const isMatchingPath = (path: string, pathname: string) => {
  if (pathname === '/home') {
    return pathname === path;
  } else if (pathname.startsWith('/post')) {
    return path == '/posts/all';
  } else if (pathname.startsWith('/my')) {
    return path.startsWith('/my');
  } else if (pathname == '/notification') {
    return path === pathname;
  } else {
    return pathname.includes(path);
  }
};

export const formatAgo = (date: string) => {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko }); // 날짜 포맷
};
