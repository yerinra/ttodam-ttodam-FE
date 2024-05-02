import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

const getKeywords = async () => {
  try {
    const response = await axiosAccess.get(`/users/keywords`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getKeywords;
