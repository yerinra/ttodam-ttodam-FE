import { BookmarkResponse } from '@/types/bookmark';

export const bookmarksMockData: BookmarkResponse = {
  list: [
    {
      id: 1,
      userId: 1,
      postId: 2,
      postTitle: '칫솔과 휴지를 함께 사실 분을 모집합니다!',
      postStatus: 'in_progress',
      products: [
        {
          productName: '크리오덴티메이트 칫솔',
          price: 10830,
          count: 30,
        },
        {
          productName: '하얀티슈 프리미엄',
          price: 30930,
          count: 3,
        },
      ],
    },
  ],
};
