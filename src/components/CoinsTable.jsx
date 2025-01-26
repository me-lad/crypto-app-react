import { tableHeadParams } from "../constants/coinsTable";
import CoinRow from "./CoinRow";

function CoinsTable({
  children,
  coins,
  coinIndex,
  setCoinModalStatus,
  watchList,
  saveWatchList,
  contentSelectedSection,
}) {
  return (
    <>
      {coins.length === 0 ? (
        <p className="my-8 text-center text-2xl font-semibold">
          Nothing found !
        </p>
      ) : (
        <table className="w-full table-auto">
          <thead className="sticky -top-px z-10 w-full bg-green-700">
            <tr className="text-white">
              {tableHeadParams.map((param, index) => (
                <th
                  className={param.class + " py-4 text-start first:text-center"}
                  key={index}
                >
                  {param.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <CoinRow
                key={coin.id}
                data={coin}
                index={index}
                coinIndex={coinIndex}
                setCoinModalStatus={setCoinModalStatus}
                watchList={watchList}
                saveWatchList={saveWatchList}
                contentSelectedSection={contentSelectedSection}
              />
            ))}
          </tbody>
        </table>
      )}
      {children}
    </>
  );
}

export default CoinsTable;
