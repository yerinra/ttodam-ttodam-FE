import { deleteNotification } from '@/apis/notification/notification';
import { Notification } from '@/mocks/mockData/notification/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNotificationMutation = () => {
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
