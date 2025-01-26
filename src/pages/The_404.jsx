import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function The_404() {
  const location = useLocation();
  useEffect(() => {
    document.title = "404 Not Found";
    document.body.classList.add("is-notFound");
  }, [location]);

  return (
    <>
      <div className="gap fixed bottom-0 left-0 right-0 top-0 m-auto flex flex-col items-center justify-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="mt-2 text-3xl">Not Found</h2>
        <h3 className="mt-2 text-lg">
          The resource requested could not be found on this server !
        </h3>

        <Link
          className="mt-4 rounded-md border-2 border-blue-500 px-7 py-2 text-lg transition-all duration-200 hover:bg-blue-500"
          to="/"
        >
          Home
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default The_404;
