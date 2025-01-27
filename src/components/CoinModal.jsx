import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { CoinModalServices } from "../services/CoinModalServices";
import { suffixCurrency } from "../helpers/functions";
import CoinChart from "./CoinChart";

function CoinModal({ status, setStatus, setErrors }) {
  //! Coin data modal
  useLockBodyScroll();
  const [coinData, setCoinData] = useState();
  const [chartDuration, setChartDuration] = useState(1);
  const [chartRef, setChartRef] = useState("prices");
  const [chartData, setChartData] = useState();
  const [isRendering, setIsRendering] = useState(false);
  const [isRendering_chart, setIsRendering_chart] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsRendering(true);
        const coinModalServices = new CoinModalServices();
        const data = await coinModalServices.getCoinData(status.id);
        setCoinData(data);
      } catch ({ name, message }) {
        if (name === "AxiosError") {
          setErrors(["You've exceeded the Rate Limit. Please try after"]);
        } else {
          setErrors([message]);
        }
        closeModal();
      } finally {
        setIsRendering(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!coinData) return;
    const getData = async () => {
      try {
        setIsRendering_chart(true);
        const coinModalServices = new CoinModalServices();
        const data = await coinModalServices.getChartData(
          status.id,
          chartDuration,
        );
        setChartData(data);
      } catch ({ name, message }) {
        if (name === "AxiosError") {
          setErrors(["You've exceeded the Rate Limit. Please try after"]);
        } else {
          setErrors([message]);
        }
        closeModal();
      } finally {
        setIsRendering_chart(false);
      }
    };
    getData();
  }, [coinData, chartDuration]);

  const closeModal = () =>
    setStatus((prevStatus) => ({ ...prevStatus, mount: false }));

  return (
    <div
      className={`fixed inset-0 w-screen backdrop-blur-sm transition-all duration-300 ${status.mount ? "visible opacity-100" : "invisible opacity-0"}`}
      style={{ zIndex: "100" }}
    >
      <div
        className={`absolute left-1/2 top-1/2 isolate flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-y-auto rounded-md border bg-black/85 px-7 py-7 text-black text-white shadow-lg ring-1 ring-black/5 transition-all duration-300 lg:w-9/12 ${status.mount ? "h-full lg:h-[85%]" : "h-0"}`}
      >
        {isRendering || !coinData ? (
          <span className="loading loading-spinner m-auto flex h-full w-[10%]"></span>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="max-w-[35px] sm:max-w-[45px]"
                  src={coinData.image.large}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "";
                    currentTarget.style.display = "flex";
                    currentTarget.style.justifyContent = "center";
                    currentTarget.style.alignItems = "center";
                  }}
                />
                <h3 className="text-2xl font-semibold">{coinData.name}</h3>
              </div>
              <FaXmark
                className="cursor-pointer text-3xl"
                onClick={() => closeModal()}
              />
            </div>
            <ModalMarketData coinData={coinData} />
            {!!isRendering_chart ? (
              <img
                src={coinData.image.large}
                className="m-auto flex h-1/5 animate-spin items-center ease-linear"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "";
                  currentTarget.style.display = "flex";
                  currentTarget.style.justifyContent = "center";
                  currentTarget.style.alignItems = "center";
                }}
              ></img>
            ) : (
              <CoinChart
                data={chartData}
                chartRef={chartRef}
                chartDuration={chartDuration}
                currentValue={
                  chartRef === "prices"
                    ? coinData.market_data.current_price.usd
                    : chartRef === "market_caps"
                      ? coinData.market_data.market_cap.usd
                      : coinData.market_data.total_volume.usd
                }
              />
            )}
            <ModalFilters
              chartDuration={chartDuration}
              setChartDuration={setChartDuration}
              chartRef={chartRef}
              setChartRef={setChartRef}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CoinModal;

const ModalMarketData = ({ coinData }) => (
  <div className="mt-6 flex items-center justify-between gap-10 overflow-x-auto overflow-y-hidden px-4 py-6 *:text-lg">
    <span className="block min-w-max">
      Price: ${coinData.market_data.current_price.usd.toLocaleString()}
    </span>
    <span className="block min-w-max">
      ATH: ${coinData.market_data.ath.usd.toLocaleString()}
    </span>
    <span className="block min-w-max">
      High 24h: ${coinData.market_data.high_24h.usd.toLocaleString()}
    </span>
    <span className="block min-w-max">
      Low 24h: ${coinData.market_data.low_24h.usd.toLocaleString()}
    </span>
    <span className="block min-w-max">
      Total Volume: ${suffixCurrency(coinData.market_data.total_volume.usd)}
    </span>
    <span className="block min-w-max">
      Market Cap: ${suffixCurrency(coinData.market_data.market_cap.usd)}
    </span>
  </div>
);

const ModalFilters = ({
  chartDuration,
  setChartDuration,
  chartRef,
  setChartRef,
}) => {
  return (
    <div className="mt-6">
      <div className="flex w-full flex-col items-center gap-2 px-4 *:border md:flex-row">
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartDuration === 1 ? `bg-white/35` : ""}`}
        >
          Day
          <input
            hidden
            name="chart-radio"
            type="radio"
            data-select-duration="1"
            onChange={(e) =>
              setChartDuration(
                +e.currentTarget.getAttribute("data-select-duration"),
              )
            }
          />
        </label>
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartDuration === 7 ? `bg-white/35` : ""}`}
        >
          Week
          <input
            hidden
            name="chart-radio"
            type="radio"
            data-select-duration="7"
            onChange={(e) =>
              setChartDuration(
                +e.currentTarget.getAttribute("data-select-duration"),
              )
            }
          />
        </label>
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartDuration === 30 ? `bg-white/35` : ""}`}
        >
          Month
          <input
            hidden
            name="chart-radio"
            type="radio"
            data-select-duration="30"
            onChange={(e) =>
              setChartDuration(
                +e.currentTarget.getAttribute("data-select-duration"),
              )
            }
          />
        </label>
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartDuration === 365 ? `bg-white/35` : ""}`}
        >
          Year
          <input
            hidden
            name="chart-radio"
            type="radio"
            data-select-duration="365"
            onChange={(e) =>
              setChartDuration(
                +e.currentTarget.getAttribute("data-select-duration"),
              )
            }
          />
        </label>
      </div>
      <div className="mt-2 flex w-full flex-col items-center gap-2 px-4 *:border md:flex-row">
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartRef === "prices" ? `bg-white/35` : ""}`}
        >
          Prices
          <input
            hidden
            name="chart-radio_ref"
            type="radio"
            data-select-ref="prices"
            onChange={(e) =>
              setChartRef(e.currentTarget.getAttribute("data-select-ref"))
            }
          />
        </label>
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartRef === "market_caps" ? `bg-white/35` : ""}`}
        >
          Market Caps
          <input
            hidden
            name="chart-radio_ref"
            type="radio"
            data-select-ref="market_caps"
            onChange={(e) =>
              setChartRef(e.currentTarget.getAttribute("data-select-ref"))
            }
          />
        </label>
        <label
          className={`w-full cursor-pointer rounded-sm py-1 text-center md:w-[24%] ${chartRef === "total_volumes" ? `bg-white/35` : ""}`}
        >
          Total volumes
          <input
            hidden
            name="chart-radio_ref"
            type="radio"
            data-select-ref="total_volumes"
            onChange={(e) =>
              setChartRef(e.currentTarget.getAttribute("data-select-ref"))
            }
          />
        </label>
      </div>
    </div>
  );
};
