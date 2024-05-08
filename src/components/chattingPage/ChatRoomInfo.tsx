import { Link } from 'react-router-dom';
import { type ChatRoom } from '@/types/chat';
import { ChevronLeftIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

type ChatRoomInfoProps = {
  data: ChatRoom | undefined;
  onLeaveChatroom: () => Promise<void>;
};

export default function ChatRoomInfo({ data, onLeaveChatroom }: ChatRoomInfoProps) {
  return (
    <section className="flex items-center p-5 bg-secondary border border-b border-slate-200 fixed w-full z-[1]">
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
          <button className="ml-auto active:border-none">
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
            <Button variant="destructive" onClick={onLeaveChatroom}>
              채팅방 나가기
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
