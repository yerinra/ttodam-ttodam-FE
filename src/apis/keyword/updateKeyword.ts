import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

const updateKeyword = async (keywordId: string, userId: string, newKeywordName: string) => {
  try {
    const response = await axiosAccess.put('/users/keywords', { keywordId, userId, keywordName: newKeywordName });
    return response.data;
  } catch (error) {
    throw new Error('키워드 수정에 실패했습니다.');
  }
};

export default updateKeyword;
