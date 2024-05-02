import { PostMap } from '@/types/post';

export const mapPosts: PostMap[] = [
  {
    postList: {
      postId: 59,
      status: 'IN_PROGRESS',
      category: 'DAILY',
      authorId: 3,
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
      place: '서울특별시 마포구 양화로 지하188',
      plocationX: 37.555573,
      plocationY: 126.924748,
      purchaseStatus: 'FAILURE',
      bookmarkId: false,
    },
    loginUserLocation: '서울특별시 마포구 양화로 지하188',
    loginUserLocationX: 37.555573,
    loginUserLocationY: 126.924748,
  },
  // {
  //   postList: {
  //     postId: 60,
  //     status: 'IN_PROGRESS',
  //     category: 'DAILY',
  //     authorId: 4,
  //     authorNickname: '유저4',
  //     title: '사과 한 박스씩 사실 분 구합니다.',
  //     content: '사과를 삽시다',
  //     products: [
  //       {
  //         productName: '사과',
  //         price: 12000,
  //         count: 10,
  //       },
  //     ],
  //     createdAt: '2024-04-18T07:05:40',
  //     updatedAt: '2024-04-26T16:22:11',
  //     place: '서울특별시 마포구 양화로 지하188',
  //     plocationX: 126.977253587649,
  //     plocationY: 37.5637650596466,
  //     purchaseStatus: 'PREPARING',
  //     bookmarkId: true,
  //   },
  //   loginUserLocation: '서울특별시 마포구 양화로 지하188',
  //   loginUserLocationX: 126.977253587649,
  //   loginUserLocationY: 37.5637650596466,
  // },
];
