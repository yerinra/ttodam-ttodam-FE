import { type PostDetail } from '@/types/post';
import Badge from '../atoms/Badge';

type UserInfoProps = {
  data: PostDetail;
};

import defaultUser from '@/assets/user.png';

export default function UserInfo({ data }: UserInfoProps) {
  const { post } = data;
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 text-primary/50 rounded-full">
        <img src={defaultUser} alt="user" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="font-semibold">{post.authorNickname}</div>

        <Badge variant="primary">{post.authorManners}점</Badge>
      </div>
    </div>
  );
}
