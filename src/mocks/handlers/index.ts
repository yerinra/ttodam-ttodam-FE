import { loginHandler, socialLoginHandler } from './auth/login';
import { signoutHandler } from './auth/signout';
import { signUpHandler, verifyEmailHandler } from './auth/signup';

import { verifyCodeHandler } from './auth/verifyCode';
import { createChatroomHandler, getChatHistoryHandler, getChatListHandler, leaveChatRoomHandler } from './chat/chat';
import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';
import { getHistoryHandler } from './myPage/history';
import { deleteKeywordHandler, getKeywordsHandler, postKeywordHandler, updateKeywordHandler } from './myPage/keyword';
import { postMannersHandler } from './myPage/manners';
import { getMyPostsHandler } from './myPage/myPosts';
import {
  getEditProfilesHandler,
  getProfilesHandler,
  putEditProfilesHandler,
  postProfileImageHandler,
  deleteUserHandler,
} from './myPage/profile';

import { deleteNotificationHandler, getAllNotificationsHandler } from './notification/notification';
import {
  getAllPostsHandler,
  getPostByParamHandler,
  deletePostHandler,
  postPostNewHandler,
  putPurchaseStatusHandler,
  categoryPostsHandler,
  putPostEditHandler,
  getMapPostsHandler,
} from './post/postHandlers';

import {
  cancelRequestHandler,
  getRequestsHandler,
  postRequestHandler,
  putRequestHandler,
} from './post/requestHandlers';

import { valuationHandler } from './post/valuations';

export const handlers = [
  verifyEmailHandler,
  verifyCodeHandler,
  signUpHandler,
  deleteUserHandler,
  signoutHandler,
  loginHandler,
  socialLoginHandler,
  getAllPostsHandler,
  categoryPostsHandler,
  getPostByParamHandler,
  getBookmarksHandler,
  postBookmarkHandler,
  deleteBookmarkHandler,
  deletePostHandler,
  putPurchaseStatusHandler,
  getProfilesHandler,
  postProfileImageHandler,
  getEditProfilesHandler,
  putEditProfilesHandler,
  getRequestsHandler,
  postRequestHandler,
  getHistoryHandler,
  postMannersHandler,
  getMyPostsHandler,
  putRequestHandler,
  cancelRequestHandler,
  valuationHandler,
  postPostNewHandler,
  getAllNotificationsHandler,
  deleteNotificationHandler,
  putPostEditHandler,
  getMapPostsHandler,
  getKeywordsHandler,
  postKeywordHandler,
  deleteKeywordHandler,
  updateKeywordHandler,
  postPostNewHandler,
  getChatListHandler,
  getChatHistoryHandler,
  leaveChatRoomHandler,
  createChatroomHandler,
];
