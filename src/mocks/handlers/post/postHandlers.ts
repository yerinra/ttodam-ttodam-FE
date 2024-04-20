import { http, HttpResponse } from 'msw';
import type { Post } from '@/types/post';
import { allPosts } from '@/mocks/mockData/post/allPosts';

import { bookmarksMockData } from '@/mocks/mockData/mypage/bookmarks';

import { requestsMockData } from '@/mocks/mockData/post/requests';


export const getAllPostsHandler = http.get('/post', () => {
  return HttpResponse.json(allPosts);
});

export const getPostByParamHandler = http.get('/post/:param', ({ params, request }) => {
  const { param } = params;

  // `param`이 숫자인지 확인하여 `postId`와 `categoryName` 구분.
  const postId = parseInt(param as string);

  if (!isNaN(postId)) {
    // `postId`가 숫자일 경우, 게시글 1개 반환
    const post = allPosts.find((post: Post) => post.Id === postId);
    return HttpResponse.json(post);
  } else if (param === 'search') {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword');

    if (!keyword) return new HttpResponse(null, { status: 404 });
    const searchResults = allPosts.filter((post: Post) => {
      return (
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.products.some(product => product.productName.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
    return HttpResponse.json(searchResults);
  } else if (param === 'bookmark') {
    return HttpResponse.json(bookmarksMockData);
  } else {
    // `postId`가 숫자가 아닐 경우, 카테고리에 맞는 포스트 목록 반환
    const filteredPosts = allPosts.filter(
      (post: Post) => post.category.toLowerCase() === (param as string).toLowerCase(),
    );
    return HttpResponse.json(filteredPosts);
  }
});

export const deletePostHandler = http.delete('/post/:param', ({ params }) => {
  const { param } = params;
  const postId = parseInt(param as string);

  if (!isNaN(postId)) {
    return HttpResponse.json({
      message: '정상적으로 삭제되었습니다.',
    });
  }
});


export const getRequestsHandler = http.get('/post/:postId/request', ({ params }) => {
  const { postId } = params;
  const postIdNum = parseInt(postId as string);

  if (!isNaN(postIdNum)) {
    return HttpResponse.json(requestsMockData);
  }
});

