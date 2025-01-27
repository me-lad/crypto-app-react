import { thousandSeparator } from "../helpers/functions";
import { FaCaretDown, FaCaretUp, FaRegStar, FaStar } from "react-icons/fa";
import { coinChartMaker } from "../constants/baseURL";
import { useEffect, useState } from "react";

function CoinRow({
  data,
  index,
  coinIndex,
  setCoinModalStatus,
  watchList,
  saveWatchList,
  contentSelectedSection,
}) {
  const [isWatched, setIsWatched] = useState();
  useEffect(() => {
    setIsWatched(watchList.findIndex((elm) => elm.id === data.id) !== -1);
  }, [contentSelectedSection, coinIndex]);

  const coinClickHandler = () => {
    setCoinModalStatus((prevStatus) => ({
      mount: !prevStatus.show,
      id: data.id,
    }));
  };

  const addCoinToList = () => {
    const currentList = JSON.parse(localStorage.getItem("watchList"));
    const newList = [...currentList, data];
    saveWatchList(newList);
  };

  const removeCoinFromList = () => {
    const currentList = JSON.parse(localStorage.getItem("watchList"));
    const newList = currentList.filter((coin) => coin.id !== data.id);
    saveWatchList(newList);
  };

  return (
    <tr className="*:py-3">
      <td className="list_btn min-w-[40px] pl-4 pr-2">
        <label className="swap">
          <input
            className="group/coinRow"
            type="checkbox"
            hidden
            checked={isWatched ? isWatched : false}
            onChange={() => {
              isWatched ? removeCoinFromList() : addCoinToList();
              setIsWatched(!isWatched);
            }}
          />
          <FaStar className="swap-on mt-2 cursor-pointer group-checked/coinRow:swap-off" />
          <FaRegStar className="swap-of mt-2 cursor-pointer group-checked/coinRow:swap-on" />
        </label>
      </td>
      <td className="thumb min-w-[30px]">{index + coinIndex}</td>
      <td
        onClick={() => coinClickHandler()}
        className="name flex min-w-[180px] cursor-pointer items-center gap-4"
      >
        <img
          className="max-h-[24px] object-cover"
          src={data.image}
          alt={data.symbol}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "";
            currentTarget.style.display = "flex";
            currentTarget.style.justifyContent = "center";
            currentTarget.style.alignItems = "center";
          }}
        />
        <h5 className="text-lg">
          {data.name.length > 17 ? data.name.slice(0, 15) + ".." : data.name}
          <small className="block text-base opacity-65">
            {data.symbol.toUpperCase()}
          </small>
        </h5>
      </td>
      <td className="price min-w-[90px]">
        ${thousandSeparator(data.current_price)}
      </td>
      <td className="percent_1 min-w-[70px]">
        {data.price_change_percentage_1h_in_currency > 0 ? (
          <span className="flex items-center gap-1 text-green-600">
            <FaCaretUp />
            {data.price_change_percentage_1h_in_currency.toFixed(2)}%
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <FaCaretDown />
            {data.price_change_percentage_1h_in_currency
              ? Math.abs(data.price_change_percentage_1h_in_currency.toFixed(2))
              : 0}
            %
          </span>
        )}
      </td>
      <td className="percent_24 min-w-[70px]">
        {data.price_change_percentage_24h_in_currency > 0 ? (
          <span className="flex items-center gap-1 text-green-600">
            <FaCaretUp />
            {data.price_change_percentage_24h_in_currency.toFixed(2)}%
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <FaCaretDown />
            {data.price_change_percentage_24h_in_currency
              ? Math.abs(
                  data.price_change_percentage_24h_in_currency.toFixed(1),
                )
              : 0}
            %
          </span>
        )}
      </td>
      <td className="percent_7 min-w-[70px]">
        {data.price_change_percentage_7d_in_currency > 0 ? (
          <span className="flex items-center gap-1 text-green-600">
            <FaCaretUp />
            {data.price_change_percentage_7d_in_currency.toFixed(2) || 0.0}%
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-600">
            <FaCaretDown />
            {data.price_change_percentage_7d_in_currency
              ? Math.abs(data.price_change_percentage_7d_in_currency.toFixed(2))
              : 0}
            %
          </span>
        )}
      </td>
      <td className="market_cap min-w-[145px]">
        {thousandSeparator(data.market_cap)}
      </td>
      <td className="volume min-w-[145px]">
        {thousandSeparator(data.total_volume)}
      </td>
      <td className="chart min-w-[165px] pr-4">
        <img
          className="w-full"
          src={coinChartMaker(data.symbol)}
          alt={data.symbol}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "";
            currentTarget.style.display = "flex";
            currentTarget.style.justifyContent = "center";
            currentTarget.style.alignItems = "center";
          }}
        />
      </td>
    </tr>
  );
}

export default CoinRow;
