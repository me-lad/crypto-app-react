function HomeContent({
  children,
  contentSelectedSection,
  setContentSelectedSection,
  setNewsMountStatus,
  setWatchListMountStatus,
}) {
  return (
    <div className="mt-10 w-full rounded-md border border-black dark:border-white">
      <div className="flex w-full items-center justify-between *:border-black *:font-semibold *:dark:border-white">
        <label
          className="flex w-1/3 cursor-pointer justify-center border-b border-r py-2 text-xl has-[:checked]:text-green-700"
          htmlFor="content-radio-1"
        >
          Coins
          <input
            className="invisible"
            type="radio"
            name="content-radio"
            id="content-radio-1"
            data-select-id="1"
            checked={contentSelectedSection === 1}
            onChange={(e) =>
              setContentSelectedSection(
                +e.currentTarget.getAttribute("data-select-id"),
              )
            }
          />
        </label>
        <label
          className="flex w-1/3 cursor-pointer justify-center border-b py-2 text-xl has-[:checked]:text-green-700"
          htmlFor="content-radio-2"
        >
          Latest News
          <input
            className="invisible"
            type="radio"
            name="content-radio"
            id="content-radio-2"
            data-select-id="2"
            checked={contentSelectedSection === 2}
            onChange={(e) => {
              setContentSelectedSection(
                +e.currentTarget.getAttribute("data-select-id"),
              );
              setNewsMountStatus(true);
            }}
          />
        </label>
        <label
          className="flex w-1/3 cursor-pointer justify-center border-b border-l py-2 text-xl has-[:checked]:text-green-700"
          htmlFor="content-radio-3"
        >
          Watch List
          <input
            className="invisible"
            type="radio"
            name="content-radio"
            id="content-radio-3"
            data-select-id="3"
            checked={contentSelectedSection === 3}
            onChange={(e) => {
              setContentSelectedSection(
                +e.currentTarget.getAttribute("data-select-id"),
              );
              setWatchListMountStatus(true);
            }}
          />
        </label>
      </div>
      {children}
    </div>
  );
}

export default HomeContent;
