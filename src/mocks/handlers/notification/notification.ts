import { notificationsMockData } from '@/mocks/mockData/notification/notifications';
import { http, HttpResponse } from 'msw';

export const getAllNotificationsHandler = http.get('/notifications', () => {
  return HttpResponse.json(notificationsMockData);
});

export const deleteNotificationHandler = http.delete('/notifications/delete/:notificationId', () => {
  return HttpResponse.json({
    message: '알림이 정상적으로 삭제되었습니다.',
  });
});
