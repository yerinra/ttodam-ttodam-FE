import { ChatList } from '@/types/chat';
import ListItemContainer from '../atoms/ListItemContainer';
import { formatAgo } from '@/lib/utils';
import Badge from '../atoms/Badge';
import { Link } from 'react-router-dom';

type ChatListItemProps = {
  chatroom: ChatList;
};

export default function ChatListItem({ chatroom }: ChatListItemProps) {
  const { chatroomId, chatName, product, hostNickname, userCount, modifiedAt } = chatroom;

  return (
    <ListItemContainer>
      <Link to={`/chatting/${chatroomId}`} className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">{product}</Badge>
          <div className="font-bold text-lg">{chatName}</div>
          <div className="flex gap-1 text-dark-gray text-sm">
            <b className="text-primary">{hostNickname}</b> 외 <div> {userCount - 1}명</div>
          </div>
        </div>
        <div className="text-dark-gray">{String(formatAgo(modifiedAt))}</div>
      </Link>
    </ListItemContainer>
  );
}
