import { PostPreview } from '@/types/post';

export const myPostsMockData: { posts: PostPreview[] } = {
  posts: [
    {
      postId: 59,
      authorId: 3,
      status: 'IN_PROGRESS',
      category: 'DAILY',
      authorNickname: '유저3',
      title: '물티슈와 휴지 같이 구매하실 분',
      content: '물티슈와 휴지를 같이 삽시다!!',
      products: [
        {
          productName: '물티슈',
          price: 12000,
          count: 10,
        },
        {
          productName: '휴지',
          price: 3000,
          count: 2,
        },
      ],
      createdAt: '2024-04-18T07:05:40',
      updatedAt: '2024-04-26T16:22:11',
    },
  ],
};
