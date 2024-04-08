import { CATEGORIES } from './data';

export type category = (typeof CATEGORIES)[number]['type'];

export type postPreview = {
  id: number;
  title: string;
  content: string;
  category: category;
  product_name: string[];
  price: number;
  original_price: number;
  participants: number;
  recruit_status: 'RECRUITING' | 'RECRUITED';
};
