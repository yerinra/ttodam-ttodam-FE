import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL: string = 'http://your-socket-server-url';

let stompClient: Stomp.Client;

export const connectToChatRoom = (chatroomId: string, callback: (users: any[]) => void): void => {
  const socket = new SockJS(`${SOCKET_URL}/ws-chatting`);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    stompClient.subscribe(`/chatroom/${chatroomId}`, response => {
      const users = JSON.parse(response.body);
      callback(users);
    });
  });
};

export const disconnectFromChatRoom = (callback: (() => void) | null = null): void => {
  if (stompClient) {
    if (callback) {
      stompClient.disconnect(callback);
    }
  }
};
