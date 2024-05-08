import H1 from '@/components/atoms/H1';
import { useQuery } from '@tanstack/react-query';
import { ChatList } from '@/types/chat';
import { getChatRoomList } from '@/apis/chat/chat';
import useRequireLogin from '@/hooks/useRequireLogin';
import Error from '@/components/atoms/Error';
import Loading from '@/components/atoms/Loading';
import ChatListItem from '@/components/chatListPage/ChatListItem';

const ChattingList = () => {
  useRequireLogin();

  const { data, error, isLoading } = useQuery<ChatList[]>({
    queryKey: ['chatList'],
    queryFn: getChatRoomList,
  });

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <H1>채팅</H1>
      <ul className="mb-6 mt-2">
        {data && data.map(chatroom => <ChatListItem key={chatroom.chatroomId} chatroom={chatroom} />)}
      </ul>
    </>
  );
};

export default ChattingList;
