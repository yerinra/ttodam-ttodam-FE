import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { BsChatTextFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';

export default function NavBar() {
  return (
    <nav className="w-full h-[55px] fixed max-w-[940px] bottom-0 bg-light-gray">
      <ul className="flex justify-between items-center w-full h-full px-5">
        <li>
          <Link to="/">
            <MdHome className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link to="/category">
            <IoMenu className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <BsChatTextFill className="w-6 h-5" />
          </Link>
        </li>
        <li>
          <Link to="/notification">
            <FaBell className="w-6 h-5" />
          </Link>
        </li>
        <li>
          <Link to="/user">
            <IoPersonSharp className="w-6 h-5" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
