import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function LoginAndSignUpBtn() {
  return (
    <div className="flex gap-5">
      <Link to="/login">
        <Button className="text-md p-5">로그인</Button>
      </Link>
      <Link to="/signup">
        <Button variant="outline" className="text-md p-5">
          회원가입
        </Button>
      </Link>
    </div>
  );
}
