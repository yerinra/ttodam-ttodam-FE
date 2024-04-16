import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getBookmarks = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/bookmarks',
    });

    return res;
  } catch (error) {
    throw error;
  }
};
