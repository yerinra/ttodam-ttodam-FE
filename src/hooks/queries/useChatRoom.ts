import { leaveChatRoom } from '@/apis/chat/chat';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useChatRoom(chatRoomId: number) {
  const navigate = useNavigate();

  const leaveChatRoomMutation = useMutation({
    mutationFn: () => leaveChatRoom(chatRoomId),
    onSuccess: () => {
      navigate('/chat');
    },
    onError: error => {
      console.error('채팅방 나가기 중 오류 발생:', error);
    },
  });

  return leaveChatRoomMutation;
}
