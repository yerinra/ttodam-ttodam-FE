import axios from 'axios';

const registerKeyword = async (userId: string, keywordName: string) => {
  try {
    const response = await axios.post('/api/register-keyword', { userId, keywordName });
    return response.data;
  } catch (error) {
    throw new Error('키워드 등록에 실패했습니다.');
  }
};

export default registerKeyword;
