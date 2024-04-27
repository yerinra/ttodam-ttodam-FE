import useUserIsLoggedInStore from '@/store/isLoginStore';
import useUserInfoStore from '@/store/userInfoStore';
import { Category } from '@/types/post';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
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
    HEALTH: '헬스/건강',
    OFFICE: '문구/오피스',
    PET: '반려동물',
    OTHER: '기타',
  };

  return categoryMap[category] || category;
}

const priceFormat = new Intl.NumberFormat('ko-KR', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

export const toPriceFormat = (value: number) => priceFormat.format(value);
