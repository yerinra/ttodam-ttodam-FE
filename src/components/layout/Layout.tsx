import Header from './Header';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen px-5">
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}
