import {
  CircleUserRound,
  Globe,
  LogIn,
  LogOut,
  MessageCircleMore,
} from "lucide-react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router";

const Nav = ({ user }) => {
  let navigate = useNavigate();
  const btnRef = useRef(null);
  const logoutUser = async () => {
    btnRef.current.textContent = "Logging out...";
    localStorage.removeItem("token");
    navigate("login");
  };
  return (
    <nav>
      <ul className="flex justify-between px-2 sm:flex-col py-2 sm:justify-stretch sm:text-xl sm:max-w-fit sm:min-h-dvh border">
        <NavLink
          to="/"
          className="flex items-center gap-2 cursor-pointer sm:mb-6"
        >
          <Globe className="size-8" />
          <span className="hidden lg:block">Global</span>
        </NavLink>

        <NavLink to="users" className="flex items-center gap-2 cursor-pointer">
          <MessageCircleMore className="size-8" />
          <span className="hidden lg:block">Chats</span>
        </NavLink>

        <li className="flex items-center gap-2 cursor-pointer sm:mt-auto sm:mb-6">
          <CircleUserRound className="size-8" />
          <span className="hidden lg:block">Profile</span>
        </li>
        {user?.id ? (
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={logoutUser}
          >
            <LogOut className="size-8" />
            <span className="hidden lg:block" ref={btnRef}>
              Logout
            </span>
          </button>
        ) : (
          <NavLink
            to="login"
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="size-8" />
            <span className="hidden lg:block">Login</span>
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
