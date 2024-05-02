import { deleteNotification, getNotification } from '@/apis/notification/notification';
import H1 from '@/components/atoms/H1';
import ListItemContainer from '@/components/atoms/ListItemContainer';
import useRequireLogin from '@/hooks/useRequireLogin';
import { formatDate } from '@/lib/utils';
import { Notification } from '@/mocks/mockData/notification/notifications';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function NotificationPage() {
  useRequireLogin();

  const { data, error, isLoading } = useQuery<Notification[]>({
    queryKey: ['notification'],
    queryFn: getNotification,
  });

  const useDeleteNotificationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (notificationId: number) => deleteNotification(notificationId),
      onMutate: (toDeleteNotificationId: number) => {
        const previousData = queryClient.getQueryData<Notification[]>(['notification']);

        queryClient.setQueryData(['bookmarks'], (previousData: Notification[]) => {
          return previousData?.filter((item: Notification) => item.notificationId !== toDeleteNotificationId) || [];
        });
        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notification'] });
        alert('알림이 삭제되었습니다.');
      },
      onError: () => {
        console.log('error!');
      },
    });
  };

  const { mutateAsync } = useDeleteNotificationMutation();
  const handleDeleteNotification = (id: number) => {
    mutateAsync(id);
  };
  if (error) return <div>Error...</div>;
  if (isLoading) return <div>isLoading...</div>;
  return (
    <div>
      <H1>알림</H1>
      <div className="flex ml-4 mb-3">
        총 <p className="text-primary ml-1">{data?.length}</p>건의 알림이 도착했습니다.
      </div>
      {data?.map(notification => (
        <ListItemContainer key={notification.notificationId}>
          <div className="flex items-center gap-x-2">
            <Link to={`/post/${notification.postId}`} className="flex items-center">
              <p className="px-[6px] py-[2px] bg-slate-200 rounded-sm text-sm text-gray-500 mr-1">
                {notification.type === 'KEYWORD' && '키워드'}
              </p>
              {/* <p className="text-primary ml-1 font-bold">휴지</p>에 대한 새 글이 올라왔어요. */}
              {notification.type === 'KEYWORD' && '등록하신 키워드에 대한 새 글이 올라왔어요.'}
            </Link>

            <button className="ml-auto" onClick={() => handleDeleteNotification(notification.notificationId)}>
              <Cross1Icon />
            </button>
          </div>
          <p className="text-sm text-gray-400">{formatDate(notification.createAt)}</p>
        </ListItemContainer>
      ))}
    </div>
  );
}
