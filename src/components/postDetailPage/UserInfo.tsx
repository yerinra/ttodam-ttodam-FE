import { type Post } from '@/types/post';
import Badge from '../atoms/Badge';

type UserInfoProps = {
  data: Post;
};

import defaultUser from '@/assets/user.png';

export default function UserInfo({ data }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2">
      {data.user.profileImgUrl === '' && (
        <div className="w-10 h-10 text-primary/50 rounded-full">
          <img src={defaultUser} alt="user" />
        </div>
      )}

      {data.user.profileImgUrl !== '' && (
        <div
          style={{ backgroundImage: `url(${data.user.profileImgUrl})` }}
          className="w-10 h-10 justify-center bg-no-repeat bg-cover bg-center rounded-full"
        />
      )}

      <div className="flex flex-col items-start gap-1">
        <div className="font-semibold">{data.user.nickname}</div>

        <Badge variant="primary">{data.user.manners * 20}점</Badge>
      </div>
    </div>
  );
}
