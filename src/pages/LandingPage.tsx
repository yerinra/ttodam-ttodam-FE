import useUserIsLogInStore from '@/store/isLoginStore';

import GoToHomePageBtn from '@/components/landingPage/GoToHomePageBtn';
import LoginAndSignUpBtn from '@/components/landingPage/LoginAndSignUpBtn';
import SlideSection from '@/components/landingPage/SlideSection';
import Logo from '@/components/landingPage/Logo';

export default function LandingPage() {
  const { isLoggedIn } = useUserIsLogInStore();

  return (
    <div className="flex flex-col mt-5 w-full h-screen px-10">
      <header className="flex items-center justify-between">
        <Logo />
        {isLoggedIn ? <GoToHomePageBtn /> : <LoginAndSignUpBtn />}
      </header>
      <SlideSection />
    </div>
  );
}
