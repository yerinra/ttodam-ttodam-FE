import { cn } from '@/lib/utils';
import { ChatTemp } from '@/types/chat';

import { FaUserCircle } from 'react-icons/fa';

type ChatMessageItemProps = {
  message: ChatTemp;
};

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  return (
    <div
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
  );
}
