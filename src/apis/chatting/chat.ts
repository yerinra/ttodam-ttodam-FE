import axios, { AxiosResponse } from 'axios';

const BASE_URL: string = 'http://your-api-url';

export const getChatRoomList = async (): Promise<ChatRoom[]> => {
  try {
    const response: AxiosResponse<ChatRoom[]> = await axios.get(`${BASE_URL}/chatrooms`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const enterChatRoom = async (chatroomId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/chatroom/${chatroomId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const createPersonalChatRoom = async (postId: string, userId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/personal-chatroom`, { postId, userId });
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const loadChatHistory = async (chatroomId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/chatroom/${chatroomId}/history`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const leaveChatRoom = async (chatroomId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/chatroom/${chatroomId}/leave`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const sendChatMessage = async (chatroomId: string, message: ChatMessage): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/chatroom/${chatroomId}/message`, message);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
}

export interface ChatMessage {
  isUser: any;
  type: string;
  content: string;
  nickname?: string;
}
