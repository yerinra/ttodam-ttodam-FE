import axios from 'axios';

const deleteKeyword = async (keywordId: string) => {
  try {
    const response = await axios.delete(`/api/delete-keyword/${keywordId}`);
    return response.data;
  } catch (error) {
    throw new Error('키워드 삭제에 실패했습니다.');
  }
};

export default deleteKeyword;
