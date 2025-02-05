import { useEffect, useState } from "react";
import { CoinsServices } from "../services/CoinsService";
import CoinsPagination from "../utils/CoinsPagination";
import Loading from "../utils/Loading";
import CoinsTable from "./CoinsTable";
import { useLocalStorage } from "@uidotdev/usehooks";

function CoinsList({
  order,
  setCoinModalStatus,
  watchList,
  saveWatchList,
  contentSelectedSection,
  setErrors,
}) {
  const [page, savePage] = useLocalStorage("currentPage", 1);
  const [isRendering, setIsRendering] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinIndex, saveCoinIndex] = useLocalStorage("currentCoinIndex", 1);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setIsRendering(true);
        const coinsServices = new CoinsServices();
        await coinsServices.getCoins(order, page);
        setCoins(coinsServices.coins);
      } catch ({ name, message }) {
        if (name === "AxiosError") {
          setErrors(["You've exceeded the Rate Limit. Please try after"]);
          setTimeout(() => window.location.reload(), 60000);
        } else {
          setErrors([message]);
        }
      } finally {
        setIsRendering(false);
      }
    };
    getCoins();
  }, [order, page]);

  return (
    <>
      {isRendering ? (
        <Loading />
      ) : (
        <CoinsTable
          coins={coins}
          coinIndex={coinIndex}
          setCoinModalStatus={setCoinModalStatus}
          watchList={watchList}
          saveWatchList={saveWatchList}
          contentSelectedSection={contentSelectedSection}
        >
          {!!coins.length > 0 && (
            <CoinsPagination
              page={page}
              setPage={savePage}
              length={coins.length}
              setCoinIndex={saveCoinIndex}
            />
          )}
        </CoinsTable>
      )}
    </>
  );
}

export default CoinsList;
