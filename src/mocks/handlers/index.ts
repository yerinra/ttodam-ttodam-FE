import { getBookmarks, postBookmark } from './myPage/bookmark';
import { getProfiles, postProfile } from './myPage/profile';
import { getAllPosts, getPostByParam } from './post/postHandlers';

export const handlers = [getAllPosts, getPostByParam, getBookmarks, postBookmark, getProfiles, postProfile];
