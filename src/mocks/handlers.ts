import { http, HttpResponse } from 'msw';
import { allPosts } from './mockData';
import type { Post } from '@/lib/types';

export const handlers = [
  http.get('/post', () => {
    return HttpResponse.json(allPosts);
  }),
  http.get('/post/:param', ({ params }) => {
    const { param } = params;

    // `param`이 숫자인지 확인하여 `postId`와 `categoryName` 구분.
    const postId = parseInt(param as string);

    if (!isNaN(postId)) {
      // `postId`가 숫자일 경우, 게시글 1개 반환
      const post = allPosts.find((post: Post) => post.Id === postId);
      return HttpResponse.json(post);
    } else {
      // `postId`가 숫자가 아닐 경우, 카테고리에 맞는 포스트 목록 반환
      const filteredPosts = allPosts.filter(
        (post: Post) => post.category.toLowerCase() === (param as string).toLowerCase(),
      );
      return HttpResponse.json(filteredPosts);
    }
  }),
];
