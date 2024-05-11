/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useRequireLogin from '@/hooks/useRequireLogin';
import useChatRoom from '@/hooks/queries/useChatRoom';
import { useCookies } from 'react-cookie';
import { API_BASE_URL } from '@/apis/apiClient';

import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { loadChatHistory, enterChatRoom } from '@/apis/chat/chat';
import type { ChatRoom, ChatTemp } from '@/types/chat';

import ChatMessageItem from '@/components/chattingPage/ChatMessageItem';
import ChatRoomInfo from '@/components/chattingPage/ChatRoomInfo';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

const ChattingPage = () => {
  const { chatroomId } = useParams();
  const roomId = chatroomId ? +chatroomId : 1;
  const [newMessage, setNewMessage] = useState<string>('');
  const [enterMsg, setEnterMsg] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatTemp[] | null>(null);

  useRequireLogin();
  const [cookie] = useCookies(['AccessToken']);

  const client = useRef<CompatClient | null>(null);

  const { data } = useQuery<ChatRoom>({
    queryKey: ['chatRoomParticipants'],
    queryFn: () => enterChatRoom(roomId),
  });

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!chatroomId) return;

      try {
        const history = await loadChatHistory(+chatroomId);
        setChatHistory(history);
      } catch (error) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchChatHistory();
  }, [chatroomId]);

  useEffect(() => {
    const connectHandler = () => {
      // SockJS 클라이언트 객체를 생성하고, 웹 소켓을 연결한다.
      const socket = new SockJS(`${API_BASE_URL}/ws-chatting`);

      // SockJS 클라이언트 객체 socket를 STOMP 프로토콜로 오버랩하여 client.current에 할당
      // client.current = Stomp.over(socket);
      client.current = Stomp.over(() => socket);
      // 클라이언트 객체를 서버와 연결
      client.current.connect(
        {
          Authorization: 'Bearer ' + cookie.AccessToken,
          'Content-Type': 'application/json',
        },
        () => {
          // 연결 성공 시 해당 방을 구독하면 서버로부터 새로운 매시지를 수신 한다.
          client.current?.subscribe(
            `/chatroom/${roomId}`,
            message => {
              // 기존 대화 내역에 새로운 메시지 추가
              setChatHistory(prevHistory => {
                return prevHistory ? [...prevHistory, JSON.parse(message.body)] : null;
              });
            },
            {
              Authorization: 'Bearer ' + cookie.AccessToken,
              'Content-Type': 'application/json',
            },
          );
        },
      );
    };
    connectHandler();
  }, []);

  useEffect(() => {
    const sendHandler = (inputValue: string) => {
      // client.current가 존재하고 연결되었다면 메시지 전송
      if (enterMsg && client.current && client.current.connected) {
        client.current.send(
          `/chattings/${roomId}/message`,
          {
            Authorization: 'Bearer ' + cookie.AccessToken,
            'Content-Type': 'application/json',
          },
          // JSON 형식으로 전송한다
          JSON.stringify({
            type: 'TALK',
            content: inputValue,
            chatroomId: roomId,
            messageCreateAt: new Date(),
          }),
        );
      }
      setEnterMsg(false);
    };
    sendHandler(newMessage);
  }, [newMessage, enterMsg]);

  const { mutateAsync: leaveMutateAsync } = useChatRoom(roomId);

  const handleLeaveChatRoom = async () => {
    if (!chatroomId) return;
    else {
      try {
        await leaveMutateAsync();
        client.current?.disconnect();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnterMsg(true);
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-secondary">
      <ChatRoomInfo data={data} onLeaveChatroom={handleLeaveChatRoom} />

      <section className="flex-1 overflow-auto px-7 mt-[120px]">
        {chatHistory && chatHistory.map(message => <ChatMessageItem message={message} key={message.content} />)}
      </section>

      <form onSubmit={handleSubmitMessage} className="flex gap-2 w-full fixed bottom-2 px-2">
        <Input type="text" className="bg-white" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <Button type="submit">
          <ArrowUpIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChattingPage;
