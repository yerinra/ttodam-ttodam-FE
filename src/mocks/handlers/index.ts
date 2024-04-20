import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';
import {
  getEditProfilesHandler,
  getProfilesHandler,
  postEditProfilesHandler,
  postProfilesHandler,
} from './myPage/profile';

import { getAllPostsHandler, getPostByParamHandler, deletePostHandler, getRequestsHandler } from './post/postHandlers';

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
];
