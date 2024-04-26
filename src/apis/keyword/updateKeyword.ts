import axios from 'axios';

const updateKeyword = async (keywordId: string, userId: string, newKeywordName: string) => {
  try {
    const response = await axios.put('/api/update-keyword', { keywordId, userId, keywordName: newKeywordName });
    return response.data;
  } catch (error) {
    throw new Error('키워드 수정에 실패했습니다.');
  }
};

export default updateKeyword;
