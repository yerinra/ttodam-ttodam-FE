import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();
export const getNotification = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/notifications`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = async (notificationId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/notifications/delete`,
      params: {
        notificationId,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
