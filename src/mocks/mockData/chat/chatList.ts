import { ChatHistory, ChatList, ChatRoom, SingleChatroomResponse } from '@/types/chat';

export const chatListMockData: ChatList[] = [
  {
    chatroomId: 1,
    chatName: '물티슈와 휴지 같이 구매하실 분',
    product: '물티슈, 휴지',
    hostId: 3,
    userCount: 3,
    hostNickname: '유저3',
    ableChat: true,
    createAt: '2024-04-18T07:05:40',
    modifiedAt: '2024-05-06T16:22:11',
  },
];

export const chatHistoryMockData: ChatHistory[] = [
  {
    messageId: 1,
    senderId: 3,
    nickname: '유저3',
    chatroomId: 1,
    content: '안녕하세요~',
    messageCreateAt: '2024-04-18T07:05:40',
  },
  {
    messageId: 2,
    senderId: 2,
    nickname: '유저2',
    chatroomId: 1,
    content: '만나서 반갑습니다.',
    messageCreateAt: '2024-04-18T07:07:40',
  },
];

export const chatroomMockData: ChatRoom = {
  post: {
    postId: 59,
    postTitle: '물티슈와 휴지 같이 구매하실 분',
  },
  profiles: [
    { userId: 1, nickname: '유저1', profileImage: '' },
    { userId: 2, nickname: '유저2', profileImage: '' },
    { userId: 3, nickname: '유저3', profileImage: '' },
  ],
};

export const singleChatroomMockData: SingleChatroomResponse = {
  chatroomId: 2,
  hostId: 4,
  userCount: 2,
  chatName: '사과 한 박스씩 사실 분 구합니다',
  createAt: '2024-04-18T07:07:40',
  profiles: [
    { userId: 2, nickname: '유저2', profileImage: '' },
    { userId: 3, nickname: '유저3', profileImage: '' },
  ],
};
