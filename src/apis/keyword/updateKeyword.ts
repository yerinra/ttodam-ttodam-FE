import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

const updateKeyword = async (keywordId: number, newKeywordName: string) => {
  try {
    const response = await axiosAccess.put('/users/keywords', null, {
      params: {
        keywordId,
        keywordName: newKeywordName,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('키워드 수정에 실패했습니다.');
  }
};

export default updateKeyword;
