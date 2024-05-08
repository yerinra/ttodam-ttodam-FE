import { leaveChatRoom, sendChatMessage } from '@/apis/chat/chat';
import { disconnectFromChatRoom } from '@/apis/chat/socket';
import { ChatContent } from '@/types/chat';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useChatRoom(chatRoomId: number) {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const leaveChatRoomMutation = useMutation({
    mutationFn: () => leaveChatRoom(chatRoomId),
    onSuccess: () => {
      disconnectFromChatRoom();
      navigate('/chat');
    },
    onError: error => {
      console.error('채팅방 나가기 중 오류 발생:', error);
    },
  });

  return leaveChatRoomMutation;
}
