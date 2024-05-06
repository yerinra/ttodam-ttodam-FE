import H1 from '../atoms/H1';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function NoBookmark() {
  return (
    <>
      <H1>나의 북마크</H1>
      <div className="pt-10 w-full flex flex-col items-center justify-center gap-y-5">
        <div className="text-center">등록된 북마크가 없습니다. </div>
        <Button>
          <Link to="/posts/all">게시판으로 가기</Link>
        </Button>
      </div>
    </>
  );
}
