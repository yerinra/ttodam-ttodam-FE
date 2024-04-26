import { axiosAccessFn } from '@/apis/apiClient';
import { RequestStatus } from '@/types/request';

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

export const putRequest = async (requestId: number, newStatus: RequestStatus) => {
  try {
    await axiosAccess({
      method: 'put',
      url: `/request/${requestId}/${newStatus}`,
    });
  } catch (error) {
    throw error;
  }
};

export const cancelRequest = async (requestId: number) => {
  try {
    await axiosAccess({
      method: 'delete',
      url: `/request/${requestId}`,
    });
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (postId: number) => {
  try {
    await axiosAccess({
      method: 'post',
      url: `/post/${postId}/request`,
    });
  } catch (error) {
    throw error;
  }
};
