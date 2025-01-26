import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import { NewsPageServices } from "../services/NewsPageServices";
import NewsFilter from "../components/NewsFilter";
import { useOutletContext } from "react-router-dom";

function News() {
  const [isRendering, setIsRendering] = useState(false);
  const [filterQuery, setFilterQuery] = useState({
    value: "",
    lang: "en",
  });
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [newsPageServices, setNewsPageServices] = useState();
  const [setErrors] = useOutletContext();

  useEffect(() => {
    const getNewsDependencies = async () => {
      try {
        setIsRendering(true);
        const newsPageServices = new NewsPageServices();
        await newsPageServices.getCategories();
        await newsPageServices.getSources(selectedLanguage);
        setSources(newsPageServices.sources);
        setCategories(newsPageServices.categories);
        setLanguages(newsPageServices.languages);
        setNewsPageServices(newsPageServices);
      } catch ({ message }) {
        setErrors([message]);
      } finally {
        setIsRendering(false);
      }
    };
    getNewsDependencies();
  }, []);

  useEffect(() => {
    const updateSourcesBasedOnSelectedLanguage = async () => {
      if (!isRendering && newsPageServices) {
        try {
          setIsRendering(true);
          await newsPageServices.getSources(selectedLanguage);
          setSources(newsPageServices.sources);
        } catch ({ message }) {
          setErrors([message]);
        } finally {
          setIsRendering(false);
        }
      }
    };
    updateSourcesBasedOnSelectedLanguage();
  }, [selectedLanguage]);

  return (
    <div className="mx-auto w-[1200px] pb-20 pt-10">
      {isRendering ? (
        <span className="loading loading-dots loading-md m-auto flex items-center"></span>
      ) : (
        <NewsFilter
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          setFilterQuery={setFilterQuery}
          sources={sources}
          categories={categories}
          languages={languages}
        />
      )}
      <NewsList
        pageName={"news"}
        language={selectedLanguage}
        filterQuery={filterQuery}
        setErrors={setErrors}
      />
    </div>
  );
}

export default News;
