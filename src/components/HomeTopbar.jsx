import SearchCoin from "./SearchCoin";

function HomeTopbar({
  contentSelectedSection,
  coinsRenderOrder,
  setCoinsRenderOrder,
  setCoinModalStatus,
  highlightsShowStatus,
  setHighlightsMountStatus,
  setHighlightsShowStatus,
  setErrors,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 gap-y-6 md:justify-between">
      <div className="flex flex-wrap items-center justify-center gap-10 gap-y-6 md:justify-start">
        <h1 className="flex flex-wrap items-center justify-center gap-y-2 text-2xl sm:justify-start sm:gap-2">
          Cryptocurrency Data by
          <label className="swap swap-indeterminate text-center sm:text-start">
            {contentSelectedSection === 1 ? (
              <input
                type="checkbox"
                onChange={(e) =>
                  setCoinsRenderOrder(
                    e.currentTarget.checked ? "volume_desc" : "market_cap_desc",
                  )
                }
              />
            ) : (
              <input type="checkbox" disabled />
            )}
            <span className="min-w-[126px] font-semibold text-green-700 transition-all">
              {coinsRenderOrder === "market_cap_desc" ? "Market Cap" : "Volume"}
            </span>
          </label>
        </h1>
        {contentSelectedSection === 1 && (
          <SearchCoin
            setCoinModalStatus={setCoinModalStatus}
            setErrors={setErrors}
          />
        )}
      </div>
      <div>
        <div className="flex items-center justify-end gap-3 text-lg">
          Highlights
          <input
            id="toggle_highlights"
            type="checkbox"
            className="checkbox border-black checked:border-transparent dark:border-white checked:dark:border-transparent"
            checked={highlightsShowStatus}
            onChange={(e) => {
              setHighlightsMountStatus(true);
              setHighlightsShowStatus(!highlightsShowStatus);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeTopbar;
