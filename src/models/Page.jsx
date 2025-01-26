import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useLocalStorage } from "@uidotdev/usehooks";
import CoinModal from "../components/CoinModal";
import ErrorModal from "../utils/ErrorModal";

function Page() {
  const [coinModalStatus, setCoinModalStatus] = useState({
    mount: false,
    id: "",
  });
  const [errors, setErrors] = useState([]);
  const [activeNavLink, setActiveNavLink] = useState();
  const [watchList, saveWatchList] = useLocalStorage("watchList", []);

  //! Removing the class that is related to 404_page
  const location = useLocation();
  useEffect(() => {
    document.title = `${location.pathname == "/" ? "Home" : location.pathname.slice(1, 2).toUpperCase() + location.pathname.slice(2)}`;
    document.body.classList.remove("is-notFound");
    setActiveNavLink(location.pathname.slice(1));
  }, [location]);
  return (
    <>
      <Header activeNavLink={activeNavLink} />
      <main className="relative">
        {errors.length > 0 ? (
          <ErrorModal errors={errors} setErrors={setErrors} />
        ) : !!coinModalStatus.mount ? (
          <CoinModal
            status={coinModalStatus}
            setStatus={setCoinModalStatus}
            setErrors={setErrors}
          />
        ) : null}
        <Outlet
          context={[
            setCoinModalStatus,
            watchList,
            saveWatchList,
            setErrors,
            errors,
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

export default Page;
