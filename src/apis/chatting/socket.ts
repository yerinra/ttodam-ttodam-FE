import io, { Socket } from 'socket.io-client';

const SOCKET_URL: string = '서버 url';

let socket: Socket;

export const connectToChatRoom = (chatroomId: string, callback: (users: any[]) => void): void => {
  socket = io(`${SOCKET_URL}/ws-chatting`);
  socket.on('connect', () => {
    socket.emit('subscribe', `/chatroom/${chatroomId}`);
  });

  socket.on('message', (response: any) => {
    const users = JSON.parse(response);
    callback(users);
  });
};

export const disconnectFromChatRoom = (): void => {
  if (socket) {
    socket.disconnect();
  }
};
