// export interface ChatRoom {
//   id: string;
//   name: string;
//   description: string;
// }

// export interface ChatMessage {
//   isUser: any;
//   type: string;
//   content: string;
//   nickname?: string;
// }

export type ChatListError = {
  code: 'NOT_FOUND';
  message: string;
  data: null;
};

export type ChatRoomInfo = {
  postId: number;
  postTitle: string;
};

export type ChatParticipant = {
  userId: number;
  nickname: string;
  profileImage: string;
};

export type ChatRoom = {
  post: ChatRoomInfo;
  profiles: ChatParticipant[];
};

export type ChatList = {
  chatroomId: number;
  chatName: string;
  product: string;
  hostId: number;
  hostNickname: string;
  userCount: number;
  createAt: string;
  modifiedAt: string;
  ableChat: boolean;
};

export type ChatHistory = {
  messageId: number;
  senderId: number;
  nickname: string;
  chatroomId: number;
  content: string;
  messageCreateAt: string;
};

export type MakeChatRoom = {
  chatroomId: number;
  hostId: number;
  userCount: 2;
  chatName: string;
  createAt: string;
  profiles: ChatParticipant[];
};

export type ChatContent = {
  type: 'TALK' | 'ENTER';
  nickname: string;
  content: string;
};
