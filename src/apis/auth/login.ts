import { axiosPublic } from '../apiClient';

export interface LoginFormData {
  email: string;
  password: string;
}

// interface ErrorResponse {
//   status: number;
//   errorCode: string;
//   message: string;
// }

// interface AuthResponse {
//   message: string;
//   accessToken: string;
// }

export const login = async (loginFormData: LoginFormData) => {
  try {
    const res = await axiosPublic.post('/users/signin', loginFormData);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const loginUser = async (userData: LoginData): Promise<string | null> => {
//   try {
//     const response = await axiosPublic.post('/users/signin', userData);
//     const authResponse: AuthResponse = response.data;
//     const token: string = authResponse.accessToken;
//     return token;
//   } catch (error: any) {
//     if (error.response) {
//       const errorResponse: ErrorResponse = error.response.data;
//       throw new Error(`로그인 실패: ${errorResponse.status}, ${errorResponse.errorCode}, ${errorResponse.message}`);
//     } else if (error.request) {
//       throw new Error('서버로부터 응답이 없습니다.');
//     } else {
//       throw new Error('요청을 설정하는 동안 오류가 발생했습니다.');
//     }
//   }
// };
