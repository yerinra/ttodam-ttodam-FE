import { Post } from '@/lib/types';

export type BookmarkResponse = {
  list: Bookmark[];
};
export type Bookmark = {
  id: number;
  postInfo: Post;
};

export const bookmarks = {
  list: [
    {
      id: 1,
      postInfo: {
        Id: 2,
        user: {
          id: 1,
          nickname: '익명의유저2',
          profileImgUrl:
            'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
          manners: 5,
        },
        productImgUrl: [
          'https://photo3.enuri.info/data/images/service/dnw/master/110388000/110388713.jpg',
          'https://photo3.enuri.info/data/images/service/dnw/master/14984000/14984034.jpg',
        ],
        title: '칫솔과 휴지를 함께 사실 분을 모집합니다!',
        deadline: '2024-04-11 12:00:00',
        status: 'in_progress',
        category: 'DAILY',
        place: '서울특별시 강남구 테헤란로 427',
        pLocationX: 37.4979254,
        pLocationY: 127.0275656,
        content: '칫솔은 10개씩 나누고 휴지는 1팩씩 가져요~',
        participants: 3,
        products: [
          {
            productId: 3,
            productName: '크리오덴티메이트 칫솔',
            price: 10830,
            count: 30,
            purchaseLink: 'https://smartstore.naver.com/groceryshop/products/123456789',
          },
          {
            productId: 4,
            productName: '하얀티슈 프리미엄',
            price: 30930,
            count: 3,
            purchaseLink: 'https://www.naver.com',
          },
        ],
        createAt: '2024-04-06 10:30:00',
        updateAt: '2024-04-06 10:30:00',
      },
    },
    {
      id: 2,
      postInfo: {
        Id: 3,
        user: {
          id: 2,
          nickname: '홍길동2',
          profileImgUrl: '',
          manners: 4,
        },
        productImgUrl: [],
        title: '주방용품 구매 도와주세요',
        deadline: '2024-04-12 18:00:00',
        status: 'in_progress',
        category: 'KITCHEN',
        place: '경기도 성남시 분당구 대왕판교로 645',
        pLocationX: 37.3949096,
        pLocationY: 127.1113331,
        content: '주방용품을 새로 구매하려고 합니다.',
        participants: 2,
        products: [
          {
            productId: 5,
            productName: '냄비세트',
            price: 45000,
            count: 1,
            purchaseLink: 'https://smartstore.naver.com/kitchenmart/products/987654321',
          },
          {
            productId: 6,
            productName: '도마',
            price: 8000,
            count: 2,
            purchaseLink: 'https://www.naver.com',
          },
        ],
        createAt: '2024-04-07 14:20:00',
        updateAt: '2024-04-07 14:20:00',
      },
    },
  ],
};
