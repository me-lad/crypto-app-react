function CoinsPagination({ page, setPage, length, setCoinIndex }) {
  return (
    <div className="join mx-auto my-4 flex justify-center *:border *:!border-black *:!bg-transparent *:!text-black *:hover:bg-transparent *:dark:!border-white *:dark:!text-white">
      {page === 1 ? (
        <button disabled className="btn join-item">
          «
        </button>
      ) : (
        <button
          onClick={() => {
            setPage((prevPage) => prevPage - 1);
            setCoinIndex((prevIndex) => prevIndex - 25);
          }}
          className="btn join-item"
        >
          «
        </button>
      )}
      <button className="btn join-item">Page {page}</button>
      {length === 0 ? (
        <button disabled className="btn join-item">
          »
        </button>
      ) : (
        <button
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            setCoinIndex((prevIndex) => prevIndex + 25);
          }}
          className="btn join-item"
        >
          »
        </button>
      )}
    </div>
  );
}

export default CoinsPagination;
