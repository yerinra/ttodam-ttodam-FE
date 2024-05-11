import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';

export default function SocialLogin() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mt-4">
      <KakaoLogin />
      <GoogleLogin />
    </div>
  );
}
