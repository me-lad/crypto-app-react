import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTitle = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = `${location.pathname == "/" ? "Home" : location.pathname.slice(1, 2).toUpperCase() + location.pathname.slice(2)}`;
    document.body.classList.remove("is-notFound");
  }, [location]);
};

export { useTitle };
