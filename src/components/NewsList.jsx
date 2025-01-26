import { useEffect, useState } from "react";
import { NewsServices } from "../services/NewsServices";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa6";
import NewsItem from "./NewsItem";

function NewsList({ pageName, language, filterQuery, setErrors }) {
  const [isRendering, setIsRendering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [newsServices, setNewsServices] = useState({});
  const [news, setNews] = useState([]);
  const [lastPublish, setLastPublish] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      if (isRendering) return;
      try {
        setIsRendering(true);
        const newsServices = new NewsServices();
        const data = await newsServices.getInitialNews(
          language,
          pageName === "news" ? 20 : 10,
          filterQuery,
        );
        setNewsServices(newsServices);
        setNews(data);
      } catch ({ message }) {
        setErrors([message]);
      } finally {
        setIsRendering(false);
      }
    };
    fetchNews();
  }, [filterQuery, language]);

  useEffect(() => {
    if (news.length === 0) return;
    setLastPublish(news[news.length - 1].PUBLISHED_ON);
  }, [news]);

  useEffect(() => {
    if (pageName !== "news") return;
    window.onscroll = () => handleScroll();
  }, [lastPublish]);

  const handleScroll = async () => {
    if (isScrolling) return;
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsScrolling(true);
      if (newsServices && lastPublish) {
        try {
          const newData = await newsServices.getSubsequentNews(lastPublish);
          setNews((prevNews) => [...prevNews, ...newData]);
        } catch ({ message }) {
          setErrors([message]);
        }
      }
      setIsScrolling(false);
    }
  };

  return (
    <>
      {isRendering ? (
        <Loading />
      ) : (
        <>
          <ul className="min-h-[600px]">
            {news.map((item) => (
              <NewsItem
                key={Math.round(
                  new Date().getTime() * (Math.random() * 10000000),
                )}
                item={item}
              />
            ))}
          </ul>
          {pageName == "news" && (
            <span
              className={`loading loading-dots loading-lg mx-auto mt-6 flex min-h-[40px] justify-center ${isScrolling ? "visible" : "invisible"}`}
            ></span>
          )}
          {pageName !== "news" && (
            <Link
              className="mx-auto mt-5 flex w-fit items-center justify-center gap-1 rounded border-2 border-black px-4 py-2 text-lg dark:border-white"
              to="/news"
            >
              View All News <FaCaretDown className="mt-1" />
            </Link>
          )}
        </>
      )}
    </>
  );
}

export default NewsList;
