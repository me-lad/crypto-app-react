import CoinsTable from "./CoinsTable";

function WatchList({ list, setList, setCoinModalStatus }) {
  return (
    <CoinsTable
      coins={list}
      coinIndex={1}
      setCoinModalStatus={setCoinModalStatus}
      watchList={list}
      saveWatchList={setList}
    />
  );
}

export default WatchList;
