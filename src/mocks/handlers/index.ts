import { deleteBookmarkHandler, getBookmarksHandler, postBookmarkHandler } from './myPage/bookmark';
import { getAllPostsHandler, getPostByParamHandler } from './post/postHandlers';

export const handlers = [
  getAllPostsHandler,
  getPostByParamHandler,
  getBookmarksHandler,
  postBookmarkHandler,
  deleteBookmarkHandler,
];
