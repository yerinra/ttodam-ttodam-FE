import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';
import { getProfiles, postProfile } from './myPage/profile';
import { getAllPostsHandler, getPostByParamHandler } from './post/postHandlers';

export const handlers = [
  getAllPostsHandler,
  getPostByParamHandler,
  getBookmarksHandler,
  postBookmarkHandler,
  deleteBookmarkHandler,
  getProfiles,
  postProfile,
];
