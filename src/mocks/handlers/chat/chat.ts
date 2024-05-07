import { chatHistoryMockData, chatListMockData, chatroomMockData } from '@/mocks/mockData/chat/chatList';
import { http, HttpResponse } from 'msw';

export const getChatListHandler = http.get('/chatrooms', ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.size == 0) return HttpResponse.json(chatListMockData);
  else return HttpResponse.json(chatroomMockData);
});

export const getChatHistoryHandler = http.get('/chatrooms/:chatroomId/message-list', () => {
  return HttpResponse.json(chatHistoryMockData);
});
