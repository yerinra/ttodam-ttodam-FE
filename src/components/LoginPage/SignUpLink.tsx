import { Link } from 'react-router-dom';

export default function SignUpLink() {
  return (
    <div className="flex justify-between w-96 mb-6">
      <Link to="/signup" className="text-sm text-gray-500">
        회원가입
      </Link>
    </div>
  );
}
