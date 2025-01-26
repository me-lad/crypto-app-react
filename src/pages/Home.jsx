import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import NewsList from "../components/NewsList";
import WatchList from "../components/WatchList";
import HomeTopbar from "../components/HomeTopbar";
import HomeHighlights from "../components/HomeHighlights";
import HomeContent from "../components/HomeContent";
import CoinsList from "../components/CoinsList";
import { useLocalStorage } from "@uidotdev/usehooks";

function Home() {
  const [highlightsMountStatus, setHighlightsMountStatus] = useState(false);
  const [highlightsShowStatus, setHighlightsShowStatus] = useState(false);
  const [newsMountStatus, setNewsMountStatus] = useState(false);
  const [watchListMountStatus, setWatchListMountStatus] = useState(false);
  const [contentSelectedSection, setContentSelectedSection] = useState(1);
  const [coinsRenderOrder, saveCoinsRenderOrder] = useLocalStorage(
    "currentRenderOrder",
    "market_cap_desc",
  );
  const [setCoinModalStatus, watchList, saveWatchList, setErrors, errors] =
    useOutletContext();

  useEffect(() => resetComponentsMountStatus(), [errors]);
  useEffect(() => {
    const timer = setTimeout(() => resetComponentsMountStatus(), 300000);
    return () => clearTimeout(timer);
  }, [highlightsMountStatus, newsMountStatus, watchListMountStatus]);
  const resetComponentsMountStatus = () => {
    setHighlightsMountStatus(false);
    setHighlightsShowStatus(false);
    setNewsMountStatus(false);
    setWatchListMountStatus(false);
    setContentSelectedSection(1);
  };

  return (
    <div className="mx-auto w-[1200px] pb-36 pt-20">
      <HomeTopbar
        contentSelectedSection={contentSelectedSection}
        coinsRenderOrder={coinsRenderOrder}
        setCoinsRenderOrder={saveCoinsRenderOrder}
        setCoinModalStatus={setCoinModalStatus}
        highlightsShowStatus={highlightsShowStatus}
        setHighlightsMountStatus={setHighlightsMountStatus}
        setHighlightsShowStatus={setHighlightsShowStatus}
        setErrors={setErrors}
      />
      {!!highlightsMountStatus && (
        <HomeHighlights
          visibility={highlightsShowStatus}
          setCoinModalStatus={setCoinModalStatus}
          setErrors={setErrors}
        />
      )}
      <HomeContent
        contentSelectedSection={contentSelectedSection}
        setContentSelectedSection={setContentSelectedSection}
        setNewsMountStatus={setNewsMountStatus}
        setWatchListMountStatus={setWatchListMountStatus}
      >
        <div className={`group/content show-${contentSelectedSection}`}>
          <div className="hidden w-full group-[.show-1]/content:block">
            <CoinsList
              order={coinsRenderOrder}
              setCoinModalStatus={setCoinModalStatus}
              watchList={watchList}
              saveWatchList={saveWatchList}
              contentSelectedSection={contentSelectedSection}
              setErrors={setErrors}
            />
          </div>
          <div className="hidden py-3 group-[.show-2]/content:block">
            {!!newsMountStatus && (
              <NewsList language={"en"} setErrors={setErrors} />
            )}
          </div>
          <div className="hidden group-[.show-3]/content:block">
            {!!watchListMountStatus ? (
              <WatchList
                list={watchList}
                setList={saveWatchList}
                setCoinModalStatus={setCoinModalStatus}
              />
            ) : null}
          </div>
        </div>
      </HomeContent>
    </div>
  );
}

export default Home;
