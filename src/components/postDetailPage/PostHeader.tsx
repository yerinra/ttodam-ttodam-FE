import BookmarkBtn from './BookmarkBtn';
import UserInfo from './UserInfo';
import HeaderBtn from './HeaderBtn';
import { ClockIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ParticipateBtnSection from './ParticipateBtnSection';
import { type Post } from '@/types/post';
import Badge from '../atoms/Badge';

type PostHeaderProps = {
  data: Post;
  isUserPost: boolean | null | undefined;
  handleDeletePost: (postId: number) => void;
};

export default function PostHeader({ data, isUserPost, handleDeletePost }: PostHeaderProps) {
  return (
    <section className="flex flex-col gap-2 border-b border-slate-200 py-6">
      <BookmarkBtn />

      <Badge variant={data.status} size="lg" />
      <h1 className="font-bold text-3xl">{data.title}</h1>

      <section className="flex items-center mt-3 mb-3 justify-between">
        <UserInfo data={data} />
        <HeaderBtn data={data} isUserPost={isUserPost} handleDeletePost={handleDeletePost} />
      </section>
      <div className="flex gap-2 items-center text-slate-600">
        <ClockIcon />
        {formatDate(data.createAt)}
        <ParticipateBtnSection data={data} isUserPost={isUserPost} />
      </div>
    </section>
  );
}
