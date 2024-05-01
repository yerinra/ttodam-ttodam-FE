import { Category, PurchaseStatus } from '@/types/post';
import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getCategoryPosts = async (selectedCategory: Category) => {
  if (selectedCategory === 'ALL') {
    try {
      const res = await axiosAccess({
        method: 'get',
        url: `post/list`,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const res = await axiosAccess({
        method: 'get',
        url: `post/category/${selectedCategory}`,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export const getSearchResults = async (keyword: string) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: 'post/search',
      params: {
        word: keyword,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
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

export const changePurchaseStatus = async (postId: number, newPurchaseStatus: PurchaseStatus) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/post/${postId}/purchase/${newPurchaseStatus}`,
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
      url: `/post/write`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPostEdit = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/post/${postId}`,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putPostEdit = async (postId: number, formData: FormData) => {
  try {
    await axiosAccess({
      method: 'put',
      url: `/post/${postId}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-Data',
      },
    });
  } catch (error) {
    throw error;
  }
};
