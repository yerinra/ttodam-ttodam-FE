import {
  chatHistoryMockData,
  chatListMockData,
  chatroomMockData,
  singleChatroomMockData,
} from '@/mocks/mockData/chat/chatList';
import { http, HttpResponse } from 'msw';

export const getChatListHandler = http.get('/chatrooms', () => {
  return HttpResponse.json(chatListMockData);
});
export const getChatRoomHandler = http.get('/chatroom', () => {
  return HttpResponse.json(chatroomMockData);
});

export const getChatHistoryHandler = http.get('/chatrooms/:chatroomId/message-list', () => {
  return HttpResponse.json(chatHistoryMockData);
});

export const leaveChatRoomHandler = http.delete(`/chatrooms/:chatroomId/exit`, () => {
  return new HttpResponse(null, { status: 200 });
});

export const createChatroomHandler = http.post('/chatrooms', () => {
  return HttpResponse.json(singleChatroomMockData);
});
