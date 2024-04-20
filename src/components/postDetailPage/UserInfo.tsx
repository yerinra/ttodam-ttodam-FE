import { Post } from '@/types/post';

type UserInfoProps = {
  data: Post;
};

export default function UserInfo({ data }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2">
      {data.user.profileImgUrl === '' && <div className="w-10 h-10 bg-slate-300 rounded-full" />}
      {data.user.profileImgUrl !== '' && (
        <div
          style={{ backgroundImage: `url(${data.user.profileImgUrl})` }}
          className="w-10 h-10 justify-center bg-no-repeat bg-cover bg-center rounded-full"
        />
      )}

      <div className="flex flex-col items-start gap-1">
        <div className="font-semibold">{data.user.nickname}</div>
        <div className="text-sm bg-primary/20 px-1 py-[2px] text-primary rounded-md font-semibold">
          {data.user.manners * 20}점
        </div>
      </div>
    </div>
  );
}
