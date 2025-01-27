import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaChevronRight } from "react-icons/fa";
import { HighlightsServices } from "../services/HighlightsServices";

function HomeHighlights({ visibility, setCoinModalStatus, setErrors }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const getHighlights = async () => {
      try {
        const highlightsServices = new HighlightsServices();
        await highlightsServices.fetch();
        setData(highlightsServices.data);
      } catch ({ name, message }) {
        if (name === "AxiosError") {
          setErrors(["You've exceeded the Rate Limit. Please try after"]);
        } else {
          setErrors([message]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getHighlights();
  }, []);

  return (
    !!visibility && (
      <>
        {isLoading ? (
          <span className="loading loading-infinity mx-auto mt-10 flex w-1/6 text-green-700"></span>
        ) : (
          <div className="mt-10 flex flex-wrap justify-between gap-2 lg:flex-nowrap">
            <GlobalMarketData data={data} />
            <TrendingCoins
              data={data}
              setCoinModalStatus={setCoinModalStatus}
            />
          </div>
        )}
      </>
    )
  );
}

export default HomeHighlights;

const GlobalMarketData = ({ data }) => {
  if (!data.marketCap || data.marketCap.length === 0) {
    return;
  }
  return (
    <div className="flex w-full flex-col items-center gap-2 md:flex-row lg:block lg:w-[43%] xl:w-[37%]">
      <div className="flex w-full items-center justify-between rounded-md border border-black p-5 dark:border-white">
        <div>
          <h2 className="text-xl text-black dark:text-white">
            ${data.marketCap.toLocaleString()}
          </h2>
          <p className="flex items-center gap-2 text-gray-800 dark:text-gray-400">
            Market Cap
            {data.changeMC < 0 ? (
              <span className="flex items-center text-red-600">
                <FaCaretDown className="mt-1" />
                {Math.abs(data.changeMC).toFixed(2)} %
              </span>
            ) : (
              <span className="flex items-center text-green-600">
                <FaCaretUp className="mt-1" />
                {Math.abs(data.changeMC).toFixed(2)} %
              </span>
            )}
          </p>
        </div>
        <div>
          <img
            className="min-h-[50px] object-cover text-center sm:min-h-[75px] md:min-h-[55px] lg:min-h-[60px]"
            src="https://www.coingecko.com/total_market_cap.svg"
            alt="Market Cap"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "";
              currentTarget.style.display = "flex";
              currentTarget.style.justifyContent = "center";
              currentTarget.style.alignItems = "center";
            }}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between rounded-md border border-black p-5 dark:border-white lg:mt-2">
        <div>
          <h2 className="text-xl text-black dark:text-white">
            ${data.totalVolume.toLocaleString()}
          </h2>
          <p className="text-gray-800 dark:text-gray-400">24h Trading Volume</p>
        </div>
        <div>
          <img
            className="min-h-[50px] object-cover sm:min-h-[75px] md:min-h-[55px] lg:min-h-[60px]"
            src="https://www.coingecko.com/total_volume.svg"
            alt="Total Trading Volume"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "";
              currentTarget.style.display = "flex";
              currentTarget.style.justifyContent = "center";
              currentTarget.style.alignItems = "center";
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TrendingCoins = ({ data, setCoinModalStatus }) => {
  if (!data.trendCoins || data.marketCap.length === 0) {
    return;
  }
  const coinClickHandler = (coinId) => {
    setCoinModalStatus((prevStatus) => ({
      mount: !prevStatus.show,
      id: coinId,
    }));
  };
  return (
    <div className="w-full overflow-hidden rounded-md border border-black p-5 pb-0 dark:border-white lg:w-[57%] xl:w-[63%]">
      <div className="mb-5 flex items-center justify-between">
        <h3>🔥Trending</h3>
      </div>
      <ul className="flex flex-col sm:block" style={{ columnCount: 2 }}>
        {data.trendCoins.map(({ item: coin }) => (
          <li key={coin.id} className="mb-4 flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => coinClickHandler(coin.id)}
            >
              <img
                className="max-w-[30px] rounded-full object-cover"
                src={coin.small}
                alt={coin.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "";
                  currentTarget.style.display = "flex";
                  currentTarget.style.justifyContent = "center";
                  currentTarget.style.alignItems = "center";
                }}
              />
              <h6 className="text-sm">
                {coin.name.length > 14
                  ? coin.name.slice(0, 11) + "..."
                  : coin.name}
              </h6>
            </div>
            <div className="flex items-center gap-2">
              <div className="group/highlight relative">
                <span>${coin.data.price.toFixed(2)}</span>
                <span className="invisible absolute -left-5 bottom-6 rounded-sm bg-black px-3 py-1 text-white opacity-0 transition-all delay-75 duration-200 group-hover/highlight:visible group-hover/highlight:opacity-100 dark:bg-white dark:text-black">
                  ${coin.data.price}
                </span>
              </div>
              {coin.data.price_change_percentage_24h.usd > 0 ? (
                <span className="flex text-green-600">
                  <FaCaretUp className="mt-1" />
                  {coin.data.price_change_percentage_24h.usd.toFixed(1)}%
                </span>
              ) : (
                <span className="flex text-red-600">
                  <FaCaretDown className="mt-1" />
                  {Math.abs(
                    coin.data.price_change_percentage_24h.usd.toFixed(1),
                  )}
                  %
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
