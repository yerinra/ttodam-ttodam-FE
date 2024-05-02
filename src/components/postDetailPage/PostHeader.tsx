import BookmarkBtn from './BookmarkBtn';
import UserInfo from './UserInfo';
import HeaderBtn from './HeaderBtn';
import { ClockIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ParticipateBtnSection from './ParticipateBtnSection';

import Badge from '../atoms/Badge';
import { PostDetail } from '@/types/post';

type PostHeaderProps = {
  data: PostDetail;
  isUserPost: boolean;
};

export default function PostHeader({ data, isUserPost }: PostHeaderProps) {
  const { post } = data;
  return (
    <section className="flex flex-col gap-2 border-b border-slate-200 py-6">
      <BookmarkBtn bookmarkId={data.bookmarkId} isBookmarked={data.bookmarkId !== 0} />

      <Badge variant={post.status} size="lg" />
      <h1 className="font-bold text-3xl">{post.title}</h1>

      <section className="flex items-center mt-3 mb-3 justify-between">
        <UserInfo data={data} />
        <HeaderBtn isUserPost={isUserPost} />
      </section>
      <div className="flex gap-2 items-center text-slate-600">
        <ClockIcon />
        {formatDate(post.createdAt)}
        <ParticipateBtnSection requestList={data.requestList} data={data} isUserPost={isUserPost} />
      </div>
    </section>
  );
}
