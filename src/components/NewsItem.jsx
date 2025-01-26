import { useEffect, useState } from "react";
import { calculateElapsedTime } from "../helpers/functions";

function NewsItem({ item }) {
  const [publishTime, setPublishTime] = useState(
    calculateElapsedTime(item.PUBLISHED_ON),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setPublishTime(calculateElapsedTime(item.PUBLISHED_ON));
    }, 60000);

    return () => clearTimeout(timer);
  }, [publishTime]);

  return (
    <li className="flex items-center gap-4 border-b border-black px-5 py-3 dark:border-white">
      <div>
        <a href={item.URL}>
          <img
            className="max-h-[105px] min-w-[105px] rounded-sm object-cover"
            src={item.IMAGE_URL}
            alt={item.KEYWORDS}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "";
              currentTarget.style.display = "flex";
              currentTarget.style.justifyContent = "center";
              currentTarget.style.alignItems = "center";
            }}
          />
        </a>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-green-700">
            {item.SOURCE_DATA.NAME}
          </span>
          <span className="text-sm opacity-60">{publishTime}</span>
        </div>
        <a href={item.URL}>
          <h3 className="mt-1 text-lg">{item.TITLE}</h3>
        </a>
        <p
          className="mt-1 text-sm tracking-wide opacity-85"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            overflow: "hidden",
          }}
        >
          {item.BODY}
        </p>
        <div className="mt-3 flex w-full items-center justify-between">
          <span
            className="text-xs opacity-60"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
            }}
          >
            Categories:
            {!!item.CATEGORY_DATA.length &&
              item.CATEGORY_DATA.map((category, index) =>
                index !== 0 ? `| ${category.NAME} ` : ` ${category.NAME} `,
              )}
          </span>
          <div className="flex items-center gap-2 text-sm *:rounded-sm *:px-3 *:py-1 *:text-xs *:!text-white">
            Sentiment:
            <span
              className={
                item.SENTIMENT == "POSITIVE"
                  ? "bg-green-700"
                  : item.SENTIMENT == "NEGATIVE"
                    ? "bg-red-700"
                    : "bg-zinc-600"
              }
            >
              {item.SENTIMENT}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default NewsItem;
