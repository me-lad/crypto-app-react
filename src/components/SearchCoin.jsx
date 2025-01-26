import { useEffect, useState } from "react";
import { SearchServices } from "../services/SearchServices";

function SearchCoin({ setCoinModalStatus, setErrors }) {
  const [searchMountStatus, setSearchMountStatus] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [searchResponse, setSearchResponse] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchString.length < 3) {
        setSearchMountStatus(false);
        return;
      }
      try {
        setIsRendering(true);
        setSearchMountStatus(true);
        const searchServices = new SearchServices();
        await searchServices.search(searchString);
        setSearchResponse(searchServices.searchResponse);
      } catch ({ name, message }) {
        if (name === "AxiosError") {
          setErrors(["You've exceeded the Rate Limit. Please try after"]);
        } else {
          setErrors([message]);
        }
      } finally {
        setIsRendering(false);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [searchString]);

  const coinClickHandler = (coinId) => {
    setCoinModalStatus((prevStatus) => ({
      mount: !prevStatus.show,
      id: coinId,
    }));
  };

  return (
    <div className={`group/search relative ${searchMountStatus && "visible"}`}>
      <input
        onChange={(e) => setSearchString(e.currentTarget.value)}
        type="text"
        placeholder="Search Coin"
        className="rounded-md border border-black bg-transparent px-4 py-2 font-semibold focus-visible:outline-none focus-visible:placeholder:text-green-700 dark:border-white"
      />
      <div className="invisible absolute top-[125%] z-50 flex max-h-[250px] min-h-[125px] w-full -translate-y-5 items-center justify-center rounded-md bg-black text-white transition-transform duration-150 group-[.visible]/search:visible group-[.visible]/search:translate-y-0 dark:bg-white dark:text-black">
        {isRendering ? (
          <span className="loading loading-spinner w-1/4"></span>
        ) : (
          <ul className="max-h-[250px] w-full overflow-y-auto overflow-x-hidden px-2">
            {searchResponse.length === 0 ? (
              <li className="text-center text-2xl">Nothing found !</li>
            ) : (
              searchResponse.map((item) => (
                <li
                  key={item.market_cap_rank}
                  onClick={() => coinClickHandler(item.id)}
                  className="flex w-full cursor-pointer justify-start gap-3 border-b border-white py-4 last:border-b-0 dark:border-black"
                >
                  <img
                    className="max-h-[42px] max-w-[42px] object-cover"
                    src={item.large}
                    alt={item.symbol}
                  />
                  <div>
                    <h4>
                      {item.name.slice(0, 20).length > 17
                        ? item.name.slice(0, 17) + "..."
                        : item.name}
                      <small className="block">{item.symbol}</small>
                    </h4>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchCoin;
