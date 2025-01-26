import ThemeHandler from "../utils/ThemeHandler";
import { Link } from "react-router-dom";

function Header({ activeNavLink }) {
  return (
    <header className="min-h-[100px] border-b-2 border-black bg-green-700 text-white group-[.is-notFound]:hidden dark:border-white">
      <div className="mx-auto flex min-h-[100px] w-[1200px] items-center justify-between">
        <div className="flex w-1/3 justify-start">
          <span className="text-3xl font-bold">Crypto App</span>
        </div>
        <nav className="flex w-1/3 justify-center">
          <ul className="flex items-center gap-8 *:opacity-60">
            <li
              className={`cursor-pointer text-xl ${activeNavLink === "" ? "!opacity-100" : ""}`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer text-xl ${activeNavLink === "news" ? "!opacity-100" : ""}`}
            >
              <Link to="/news">News</Link>
            </li>
          </ul>
        </nav>
        <div className="flex min-h-[56px] w-1/3 items-center justify-end gap-4">
          <ThemeHandler />
        </div>
      </div>
    </header>
  );
}

export default Header;
