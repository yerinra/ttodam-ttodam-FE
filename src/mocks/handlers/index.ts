import { bookmarkHandlers } from './bookmark/bookmark';
import { handlers as postHandlers } from './post/postHandlers';
export const handlers = [...postHandlers, ...bookmarkHandlers];
