import { axiosAccessFn } from '../apiClient';
import { ChatRoom, ChatMessage } from '@/types/chatTypes';

const axiosAccess = axiosAccessFn();

const BASE_URL: string = 'http://api-url';

export const getChatRoomList = async (): Promise<ChatRoom[]> => {
  try {
    const response = await axiosAccess.get(`${BASE_URL}/chatrooms`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const enterChatRoom = async (chatroomId: string): Promise<any> => {
  try {
    const response = await axiosAccess.get(`${BASE_URL}/chatrooms/${chatroomId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const createPersonalChatRoom = async (postId: string, userId: string): Promise<any> => {
  try {
    const response = await axiosAccess.post(`${BASE_URL}/chatrooms`, { postId, userId });
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const loadChatHistory = async (chatroomId: string): Promise<any> => {
  try {
    const response = await axiosAccess.get(`${BASE_URL}/chatroom/${chatroomId}/message-list`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const leaveChatRoom = async (chatroomId: string): Promise<any> => {
  try {
    const response = await axiosAccess.delete(`${BASE_URL}/chatrooms/${chatroomId}/exit`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const sendChatMessage = async (chatroomId: string, message: ChatMessage): Promise<any> => {
  try {
    const response = await axiosAccess.post(`${BASE_URL}/chatroom/${chatroomId}/message`, message);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export type { ChatRoom, ChatMessage };
