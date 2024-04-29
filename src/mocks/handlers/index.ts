import { loginHandler, socialLoginHandler } from './auth/login';
import { signoutHandler } from './auth/signout';
import { signUpHandler, verifyEmailHandler } from './auth/signup';
// import { signupHandler } from './auth/signup';
import { verifyCodeHandler } from './auth/verifyCode';

import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';

import { getHistoryHandler } from './myPage/history';
import { postMannersHandler } from './myPage/manners';

import { getMyPostsHandler } from './myPage/myPosts';

import {
  getEditProfilesHandler,
  getProfilesHandler,
  postEditProfilesHandler,
  postProfilesHandler,
} from './myPage/profile';

import { deleteNotificationHandler, getAllNotificationsHandler } from './notification/notification';

import {
  getAllPostsHandler,
  getPostByParamHandler,
  deletePostHandler,
  postPostNewHandler,
  putPurchaseStatusHandler,
  putPostEditHandler,
  categoryPostsHandler,
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
  postProfilesHandler,
  getEditProfilesHandler,
  postEditProfilesHandler,
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
];
