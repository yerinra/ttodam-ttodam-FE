import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

const deleteKeyword = async (keywordId: number) => {
  try {
    const response = await axiosAccess.delete(`/users/keywords`, {
      params: {
        keywordId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('키워드 삭제에 실패했습니다.');
  }
};

export default deleteKeyword;
