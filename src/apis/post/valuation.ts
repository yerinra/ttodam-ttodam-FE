import { axiosAccessFn } from '../apiClient';
const axiosAccess = axiosAccessFn();

export const putValuation = async (postId: number, valuations: { userId: number; count: number }[]) => {
  const valuationsObject = valuations.reduce(
    (acc, { userId, count }) => {
      acc[userId] = count;
      return acc;
    },
    <{ [key: number]: number }>{},
  );

  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/users/activities/manners/${postId}`,
      data: { mannersForMembers: valuationsObject },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
