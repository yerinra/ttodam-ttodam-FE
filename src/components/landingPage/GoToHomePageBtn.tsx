import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function GoToHomePageBtn() {
  return (
    <div className="flex gap-5">
      <Link to="/login">
        <Button className="text-md p-5">홈으로</Button>
      </Link>
    </div>
  );
}
