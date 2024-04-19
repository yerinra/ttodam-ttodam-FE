import { getBookmarks, postBookmark } from './myPage/bookmark';
import { getAllPosts, getPostByParam } from './post/postHandlers';

export const handlers = [getAllPosts, getPostByParam, getBookmarks, postBookmark];
