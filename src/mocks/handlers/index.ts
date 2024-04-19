import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';
import { getProfilesHandler, postProfilesHandler } from './myPage/profile';
import { getAllPostsHandler, getPostByParamHandler } from './post/postHandlers';

export const handlers = [
  getAllPostsHandler,
  getPostByParamHandler,
  getBookmarksHandler,
  postBookmarkHandler,
  deleteBookmarkHandler,
  getProfilesHandler,
  postProfilesHandler,
];
