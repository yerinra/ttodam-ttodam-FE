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

import { getAllPostsHandler, getPostByParamHandler, deletePostHandler, postPostNewHandler } from './post/postHandlers';

import { cancelRequestHandler, getRequestsHandler, putRequestHandler } from './post/requestHandlers';

export const handlers = [
  getAllPostsHandler,
  getPostByParamHandler,
  getBookmarksHandler,
  postBookmarkHandler,
  deleteBookmarkHandler,
  deletePostHandler,
  getProfilesHandler,
  postProfilesHandler,
  getEditProfilesHandler,
  postEditProfilesHandler,
  getRequestsHandler,
  getHistoryHandler,
  postMannersHandler,
  getMyPostsHandler,
  putRequestHandler,
  cancelRequestHandler,
  postPostNewHandler,
];
