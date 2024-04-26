import { axiosAccessFn } from '@/apis/apiClient';

const axiosAccess = axiosAccessFn();
export const postManners = async (membersId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/users/activities/manners/${membersId}`,
    });

    return res.data.list;
  } catch (error) {
    throw error;
  }
};
