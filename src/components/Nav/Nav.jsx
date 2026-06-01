import { CircleUserRound, Globe, MessageCircleMore, Power } from "lucide-react";

const Nav = () => {
  return (
    <nav>
      <ul className="flex justify-between px-2 sm:flex-col sm:py-2 sm:justify-stretch sm:text-xl sm:max-w-fit sm:min-h-dvh">
        <li className="flex items-center gap-2 cursor-pointer sm:mb-6">
          <Globe className="size-8" />
          <span className="hidden lg:block">Global</span>
        </li>
        <li className="flex items-center gap-2 cursor-pointer">
          <MessageCircleMore className="size-8" />
          <span className="hidden lg:block">Chats</span>
        </li>
        <li className="flex items-center gap-2 cursor-pointer sm:mt-auto sm:mb-6">
          <CircleUserRound className="size-8" />
          <span className="hidden lg:block">Profile</span>
        </li>
        <li className=" flex items-center gap-2 cursor-pointer">
          <Power className="size-8" />
          <span className="hidden lg:block">Login</span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
