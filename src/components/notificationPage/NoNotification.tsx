import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function NoNotification() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5">
      <div className="">도착한 알림이 없습니다.</div>
      <Link to="/posts/all">
        <Button variant="secondary">게시판으로 가기</Button>
      </Link>
    </div>
  );
}
