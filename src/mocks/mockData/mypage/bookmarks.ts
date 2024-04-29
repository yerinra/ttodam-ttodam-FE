import { BookmarkResponse } from '@/types/bookmark';

export const bookmarksMockData: BookmarkResponse = {
  list: [
    {
      id: 1,
      userId: 4,
      postId: 60,
      postTitle: '사과 한 박스씩 사실 분 구합니다.',
      postStatus: 'IN_PROGRESS',
      products: [
        {
          productName: '사과',
          price: 10000,
          count: 2,
        },
      ],
    },
  ],
};
