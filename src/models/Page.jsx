import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useLocalStorage } from "@uidotdev/usehooks";
import CoinModal from "../components/CoinModal";
import ErrorModal from "../utils/ErrorModal";
import { useTitle } from "../hooks/useTitle";

function Page() {
  const [coinModalStatus, setCoinModalStatus] = useState({
    mount: false,
    id: "",
  });
  const [errors, setErrors] = useState([]);
  const [errorModalRemainingCounter, setErrorModalRemainingCounter] =
    useState(60);
  const [watchList, saveWatchList] = useLocalStorage("watchList", []);
  //! Manage each page title
  useTitle();
  return (
    <>
      <Header />
      <main className="relative">
        {errors.length > 0 ? (
          <ErrorModal
            errors={errors}
            setErrors={setErrors}
            counter={errorModalRemainingCounter}
            setCounter={setErrorModalRemainingCounter}
          />
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
