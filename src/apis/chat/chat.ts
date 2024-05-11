import { axiosAccessFn } from '../apiClient';

const axiosAccess = axiosAccessFn();

export const getChatRoomList = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/chatrooms',
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const enterChatRoom = async (chatroomId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/chatroom`,
      params: { chatroomId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPersonalChatRoom = async (postId: number) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/chatrooms`,
      data: { postId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loadChatHistory = async (chatroomId: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/chatrooms/${chatroomId}/message-list`,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const leaveChatRoom = async (chatroomId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/chatrooms/${chatroomId}/exit`,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
