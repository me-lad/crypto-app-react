import ThemeHandler from "../utils/ThemeHandler";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="min-h-[100px] border-b-2 border-black bg-green-700 text-white group-[.is-notFound]:hidden dark:border-white">
      <div className="relative mx-auto flex min-h-[100px] w-full flex-wrap items-center justify-center px-1 lg:container sm:px-6 md:justify-between lg:max-w-[1225px]">
        <div className="flex w-full justify-center md:w-1/3 md:justify-start">
          <span className="text-3xl font-bold">Crypto App</span>
        </div>
        <nav className="flex w-full justify-center md:w-1/3">
          <ul className="flex items-center gap-8 *:*:opacity-60">
            <li className={`cursor-pointer text-xl`}>
              <NavLink className="aria-[current]:opacity-100" to="/">
                Home
              </NavLink>
            </li>
            <li className={`cursor-pointer text-xl`}>
              <NavLink className="aria-[current]:opacity-100" to="/news">
                News
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute -bottom-[0.4rem] right-2 flex min-h-[56px] items-center justify-center gap-4 md:static md:w-1/3 md:justify-end">
          <ThemeHandler />
        </div>
      </div>
    </header>
  );
}

export default Header;
