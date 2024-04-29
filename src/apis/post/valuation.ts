import { axiosAccessFn } from '../apiClient';
const axiosAccess = axiosAccessFn();

export const putValuation = async (memberId: number, postId: number, manners: number) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/users/activities/${postId}/manners/${memberId}`,
      data: { manners },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
