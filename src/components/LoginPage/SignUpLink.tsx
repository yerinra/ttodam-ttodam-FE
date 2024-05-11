import { Link } from 'react-router-dom';

export default function SignUpLink() {
  return (
    <div className="ml-auto mb-7 -mt-3">
      <Link to="/signup" className="text-sm text-gray-500">
        회원가입 하러가기
      </Link>
    </div>
  );
}
