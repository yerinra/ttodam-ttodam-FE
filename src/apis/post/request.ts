import { axiosAccessFn } from '@/apis/apiClient';

const axiosAccess = axiosAccessFn();
export const getRequests = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/post/${postId}/request`,
    });

    return res.data.participationRequests;
  } catch (error) {
    throw error;
  }
};
