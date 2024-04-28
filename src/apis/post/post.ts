import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getPost = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/post/${postId}`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/post/${postId}`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postPostNew = async (formData: FormData) => {
  try {
    await axiosAccess({
      method: 'post',
      url: `/post`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};
