import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { sendChatMessage, loadChatHistory, leaveChatRoom, ChatMessage, enterChatRoom } from '@/apis/chat/chat';
import { connectToChatRoom, disconnectFromChatRoom } from '@/apis/chat/socket';
import { FaUserCircle } from 'react-icons/fa';
import { ChatHistory, ChatRoom } from '@/types/chat';
import useRequireLogin from '@/hooks/useRequireLogin';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ChattingPage: React.FC = () => {
  const { chatroomId } = useParams();
  const roomId = chatroomId ? +chatroomId : 1;
  const [messages, setMessages] = useState<ChatHistory[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const navigate = useNavigate();

  useRequireLogin();

  const { data } = useQuery<ChatRoom>({
    queryKey: ['chatRoomParticipants'],
    queryFn: () => enterChatRoom(roomId),
  });

  useEffect(() => {
    const fetchChatHistoryAndConnect = async () => {
      if (!chatroomId) return;

      try {
        const history = await loadChatHistory(+chatroomId);
        setMessages(history);
        connectToChatRoom(chatroomId, handleNewMessage);
      } catch (error) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchChatHistoryAndConnect();

    return () => {
      disconnectFromChatRoom();
    };
  }, [chatroomId]);

  const handleNewMessage = (users: any[]) => {
    console.log('새로운 메시지가 도착했습니다:', users);
  };

  const handleMessageSend = () => {
    if (newMessage.trim() === '') return;
    if (!chatroomId) return;

    const newChatMessage: ChatMessage = {
      type: 'TALK',
      content: newMessage,
      isUser: true,
    };

    sendChatMessage(chatroomId, newChatMessage)
      .then(() => {
        setNewMessage('');
      })
      .catch(error => {
        console.error('메시지 전송 중 오류 발생:', error);
      });
  };

  const useLeaveChatRoomMutation = (chatRoomId: number) => {
    return useMutation({
      mutationFn: () => leaveChatRoom(chatRoomId),
      onSuccess: () => {
        disconnectFromChatRoom();
        navigate('/chat');
      },
      onError: () => {
        console.error('채팅방 나가기 중 오류 발생:', error);
      },
    });
  };

  const { mutateAsync } = useLeaveChatRoomMutation(roomId);

  const handleLeaveChatRoom = async () => {
    if (!chatroomId) return;
    else {
      try {
        await mutateAsync();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full bg-secondary">
      <div className="flex items-center p-5 bg-secondary border border-b border-slate-200 fixed w-full z-[1]">
        <Link to="/chat">
          <ChevronLeftIcon className="w-6 h-6 mr-5" />
        </Link>

        <div className="flex flex-col">
          {data && (
            <>
              <span className="text-lg font-extrabold">{data.post.postTitle}</span>
              <div className="flex gap-1 text-sm text-dark-gray">
                {data.profiles.map(p => (
                  <span key={p.userId}>{p.nickname}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button onClick={handleLeaveChatRoom} className="ml-auto active:border-none">
              <DotsHorizontalIcon className="w-6 h-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={`/post/${data?.post.postId}`}>
                <Button variant="ghost">글 보러가기</Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="destructive" onClick={handleLeaveChatRoom}>
                채팅방 나가기
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto px-7 mt-[90px]">
        {messages &&
          messages.map(message => (
            <div
              key={message.messageId}
              className={cn(
                'flex my-4',
                { 'justify-end': message.senderId === 3 },
                { 'justify-start': message.senderId !== 3 },
              )}
            >
              <div
                className={cn(
                  `flex flex-col mr-2 gap-2`,
                  { 'items-end': message.senderId === 3 },
                  { 'items-start': message.senderId !== 3 },
                )}
              >
                {message.senderId !== 3 && (
                  <div className="flex items-center">
                    <FaUserCircle size={28} className="text-primary/80 mr-2" />
                    <span className="font-semibold">{message.nickname}</span>
                  </div>
                )}
                <div
                  className={cn(
                    `rounded-xl px-3 py-[5px] max-w-max`,
                    { 'bg-primary text-white': message.senderId === 3 },
                    { 'bg-white': message.senderId !== 3 },
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
      </div>

      <form onSubmit={handleMessageSend} className="flex gap-2 w-full fixed bottom-2 px-2">
        <Input type="text" className="bg-white" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <Button type="submit">
          <ArrowUpIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChattingPage;
