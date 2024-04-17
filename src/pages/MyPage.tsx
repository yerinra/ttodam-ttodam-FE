import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div>
      <Link className="bg-slate-200 text-primary px-2 py-1" to="/my/bookmark">
        북마크 조회를 위한 임시 버튼
      </Link>
      <Link className="bg-slate-200 text-primary px-2 py-1" to="/my/profile">
        프로필 조회를 위한 임시 버튼
      </Link>
    </div>
  );
}
