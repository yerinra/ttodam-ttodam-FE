import { useQuery } from '@tanstack/react-query';

import useRequireLogin from '@/hooks/useRequireLogin';
import { getNotification } from '@/apis/notification/notification';
import { Notification } from '@/mocks/mockData/notification/notifications';

import H1 from '@/components/atoms/H1';
import NoNotification from '@/components/notificationPage/NoNotification';
import NotificationItem from '@/components/notificationPage/NotificationItem';
import NotificationSummary from '@/components/notificationPage/NotificationSummary';

import Loading from '@/components/atoms/Loading';
import Error from '@/components/atoms/Error';

export default function NotificationPage() {
  useRequireLogin();

  const { data, error, isLoading } = useQuery<Notification[]>({
    queryKey: ['notification'],
    queryFn: getNotification,
  });

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div>
      <H1>알림</H1>
      {data?.length == 0 && <NoNotification />}
      {data?.length !== 0 && (
        <>
          <NotificationSummary notificationCount={data?.length || 0} />
          {data?.map(notification => (
            <NotificationItem key={notification.notificationId} notification={notification} />
          ))}
        </>
      )}
    </div>
  );
}
