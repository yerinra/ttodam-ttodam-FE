export type Notification = {
  notificationId: number;
  userId: number;
  type: 'KEYWORD';
  postId: number;
  createAt: string;
};

export const notificationsMockData: Notification[] = [
  {
    notificationId: 7,
    userId: 63,
    type: 'KEYWORD',
    postId: 38,
    createAt: '2024-04-27T16:01:09',
  },
  {
    notificationId: 8,
    userId: 63,
    type: 'KEYWORD',
    postId: 38,
    createAt: '2024-04-27T16:01:09',
  },
];
