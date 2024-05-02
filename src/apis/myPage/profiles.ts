import { EditProfileToSend } from '@/types/profile';
import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getProfile = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/profiles',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getEditProfiles = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/users/profiles/update',
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putEditProfiles = async (data: EditProfileToSend) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: '/users/profiles/update',
      data,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAccount = async () => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: '/users/withdraw',
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
