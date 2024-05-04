import { Notification } from '@/mocks/mockData/notification/notifications';
import ListItemContainer from '../atoms/ListItemContainer';
import { useDeleteNotificationMutation } from '@/hooks/queries/useDeleteNotificationMutation';
import { Link } from 'react-router-dom';
import { Cross1Icon } from '@radix-ui/react-icons';
import { formatDate } from '@/lib/utils';

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { mutateAsync } = useDeleteNotificationMutation();
  const handleDeleteNotification = (id: number) => {
    mutateAsync(id);
  };

  return (
    <ListItemContainer key={notification.notificationId}>
      <div className="flex items-center gap-x-2">
        <Link to={`/post/${notification.postId}`} className="flex items-center">
          <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">
            {notification.type === 'KEYWORD' && '키워드'}
          </p>
          {notification.type === 'KEYWORD' && '등록하신 키워드에 대한 새 글이 올라왔어요.'}
        </Link>

        <button className="ml-auto" onClick={() => handleDeleteNotification(notification.notificationId)}>
          <Cross1Icon />
        </button>
      </div>
      <p className="text-sm text-gray-400">{formatDate(notification.createAt)}</p>
    </ListItemContainer>
  );
}
