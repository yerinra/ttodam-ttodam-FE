import axios from 'axios';

const signUp = async (userData) => {
  try {
 
    const response = await axios.post('/api/signup', userData);
    return response.data; 
  } catch (error) {
    throw new Error('회원가입에 실패했습니다.');
  }
};

export default signUp;