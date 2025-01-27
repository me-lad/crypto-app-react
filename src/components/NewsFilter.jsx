import { useEffect, useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FaCaretDown, FaCaretUp, FaCheck, FaXmark } from "react-icons/fa6";

function NewsFilter({
  selectedLanguage,
  setSelectedLanguage,
  setFilterQuery,
  sources,
  categories,
  languages,
}) {
  const [activeDropDown, setActiveDropDown] = useState("0");
  const [selectedSources, setSelectedSources] = useState(
    sources.map((source) => source.SOURCE_KEY),
  );
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.NAME),
  );

  const handleDropDown = (target) => {
    const dropDowns = document.querySelectorAll("#filter-dropDown");
    dropDowns.forEach((elm) => elm.classList.remove("showDropDown"));
    setActiveDropDown((prevVal) => "0");
    if (target !== "blur") {
      target.classList.add("showDropDown");
      setActiveDropDown(target.getAttribute("data-select-id"));
    }
  };

  const resetFilters = () => {
    setSelectedLanguage("en");
    setSelectedSources(sources.map((source) => source.SOURCE_KEY));
    setSelectedCategories(categories.map((category) => category.NAME));
  };
  const buildQuery = () => {
    let query = "";
    if (selectedSources.length > 0 && selectedSources.length < sources.length) {
      query += `&source_ids=${selectedSources.join(",")}`;
    }
    if (
      selectedCategories.length > 0 &&
      selectedCategories.length < categories.length
    ) {
      query += `&categories=${selectedCategories.join(",")}`;
    }
    setFilterQuery({
      value: query,
      lang: selectedLanguage,
    });
  };

  return (
    <div
      onBlur={() => handleDropDown("blur")}
      className="mb-12 mt-6 flex flex-wrap items-center justify-between gap-y-2 border-b border-black px-1 pb-4 dark:border-white"
    >
      <LanguageFilter
        activeDropDown={activeDropDown}
        handleDropDown={handleDropDown}
        languages={languages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <SourceFilter
        activeDropDown={activeDropDown}
        handleDropDown={handleDropDown}
        sources={sources}
        selectedSources={selectedSources}
        setSelectedSources={setSelectedSources}
      />
      <CategoryFilter
        activeDropDown={activeDropDown}
        handleDropDown={handleDropDown}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <button
        onClick={() => buildQuery()}
        className="flex min-w-[49.75%] items-center justify-center gap-2 rounded-sm border border-gray-500 py-1 transition-all hover:bg-gray-500 lg:min-w-[12.5%]"
      >
        Set Filters
        <FaCheck className="mt-1 text-green-700" />
      </button>
      <button
        onClick={() => resetFilters()}
        className="flex min-w-[49.75%] items-center justify-center gap-2 rounded-sm border border-gray-500 py-1 transition-all hover:bg-gray-500 lg:min-w-[12.5%]"
      >
        Reset Filters
        <FaXmark className="mt-1 text-red-700" />
      </button>
    </div>
  );
}

export default NewsFilter;

const LanguageFilter = ({
  activeDropDown,
  handleDropDown,
  languages,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const handleLanguage = (langCode) => setSelectedLanguage(langCode);
  return (
    <button
      id="filter-dropDown"
      data-select-id="1"
      onClick={(e) => handleDropDown(e.currentTarget)}
      className="group/filter relative flex w-full items-center justify-center gap-2 rounded-sm border border-gray-500 py-1 transition-all hover:bg-gray-500 md:max-w-[33%] lg:max-w-[24%]"
    >
      Languages
      {activeDropDown === "1" ? (
        <FaCaretUp className="mt-1" />
      ) : (
        <FaCaretDown className="mt-1" />
      )}
      <ul className="invisible absolute top-[125%] z-50 w-full -translate-y-3 overflow-y-auto rounded-sm border border-black bg-slate-50 opacity-0 transition-all duration-300 group-[.showDropDown]/filter:visible group-[.showDropDown]/filter:translate-y-0 group-[.showDropDown]/filter:opacity-100 dark:border-white dark:bg-stone-950">
        {languages.map((language, index) => (
          <li
            id="lang-btn"
            className="flex w-full items-center gap-2 p-2 text-start font-semibold transition-all hover:bg-gray-500"
            key={index}
            data-lang-code={language.code}
            onClick={(e) => handleLanguage(language.code)}
          >
            {selectedLanguage === language.code ? (
              <BiCheckboxChecked className="mt-1 text-2xl" />
            ) : (
              <BiCheckbox className="mt-1 text-2xl" />
            )}
            <span className="text-base font-semibold text-black dark:text-white">
              {language.name}
            </span>
          </li>
        ))}
      </ul>
    </button>
  );
};

const SourceFilter = ({
  activeDropDown,
  handleDropDown,
  sources,
  selectedSources,
  setSelectedSources,
}) => {
  const handleSource = (sourceKey) => {
    if (selectedSources.includes(sourceKey)) {
      setSelectedSources((prevSources) =>
        prevSources.filter((source) => source !== sourceKey),
      );
    } else {
      setSelectedSources((prevSources) => [...prevSources, sourceKey]);
    }
  };

  return (
    <button
      id="filter-dropDown"
      data-select-id="2"
      onClick={(e) => handleDropDown(e.currentTarget)}
      className="group/filter relative flex w-full items-center justify-center gap-2 rounded-sm border border-gray-500 py-1 transition-all hover:bg-gray-500 md:max-w-[33%] lg:max-w-[24%]"
    >
      News Feeds
      {activeDropDown === "2" ? (
        <FaCaretUp className="mt-1" />
      ) : (
        <FaCaretDown className="mt-1" />
      )}
      <ul className="invisible absolute top-[125%] z-50 max-h-[350px] w-full -translate-y-3 overflow-y-auto rounded-sm border border-black bg-slate-50 opacity-0 transition-all duration-300 group-[.showDropDown]/filter:visible group-[.showDropDown]/filter:translate-y-0 group-[.showDropDown]/filter:opacity-100 dark:border-white dark:bg-stone-950">
        <li className="flex w-full flex-col items-center p-2 text-lg">
          <span
            onClick={() => setSelectedSources([])}
            className="flex items-center gap-1 transition-all hover:text-red-600"
          >
            Deselect All
            <FaXmark className="mt-1" />
          </span>
          <span
            onClick={() =>
              setSelectedSources(sources.map((source) => source.SOURCE_KEY))
            }
            className="flex items-center gap-1 transition-all hover:text-green-600"
          >
            Select All
            <FaCheck className="mt-1" />
          </span>
        </li>
        {sources.map((source) => (
          <li
            key={Math.floor(new Date().getTime() * (Math.random() * 100))}
            className="flex items-center gap-2 p-2 font-semibold transition-all hover:text-green-700"
            onClick={() => handleSource(source.SOURCE_KEY)}
          >
            {selectedSources.includes(source.SOURCE_KEY) ? (
              <BiCheckboxChecked className="mt-1 text-2xl" />
            ) : (
              <BiCheckbox className="mt-1 text-2xl" />
            )}
            <img
              className="w-1/12 rounded-sm md:w-1/6"
              src={source.IMAGE_URL}
              alt={source.NAME}
            />
            <span>{source.NAME}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

const CategoryFilter = ({
  activeDropDown,
  handleDropDown,
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCategory = (name) => {
    if (selectedCategories.includes(name)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== name),
      );
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, name]);
    }
  };

  return (
    <button
      id="filter-dropDown"
      data-select-id="3"
      onClick={(e) => handleDropDown(e.currentTarget)}
      className="group/filter relative flex w-full items-center justify-center gap-2 rounded-sm border border-gray-500 py-1 transition-all hover:bg-gray-500 md:max-w-[33%] lg:max-w-[24%]"
    >
      Categories
      {activeDropDown === "3" ? (
        <FaCaretUp className="mt-1" />
      ) : (
        <FaCaretDown className="mt-1" />
      )}
      <ul className="invisible absolute top-[125%] z-50 max-h-[350px] w-full -translate-y-3 overflow-y-auto rounded-sm border border-black bg-slate-50 opacity-0 transition-all duration-300 group-[.showDropDown]/filter:visible group-[.showDropDown]/filter:translate-y-0 group-[.showDropDown]/filter:opacity-100 dark:border-white dark:bg-stone-950">
        <li className="flex w-full flex-col items-center p-2 text-lg">
          <span
            onClick={() => setSelectedCategories([])}
            className="flex items-center gap-1 transition-all hover:text-red-600"
          >
            Deselect All
            <FaXmark className="mt-1" />
          </span>
          <span
            onClick={() =>
              setSelectedCategories(categories.map((category) => category.NAME))
            }
            className="flex items-center gap-1 transition-all hover:text-green-600"
          >
            Select All
            <FaCheck className="mt-1" />
          </span>
        </li>
        {categories.map((category) => (
          <li
            onClick={() => handleCategory(category.NAME)}
            key={Math.floor(new Date().getTime() * (Math.random() * 1000000))}
            className="flex w-full items-center gap-2 p-2 text-start font-semibold transition-all hover:text-green-700"
          >
            {selectedCategories.includes(category.NAME) ? (
              <BiCheckboxChecked className="mt-1 text-2xl" />
            ) : (
              <BiCheckbox className="mt-1 text-2xl" />
            )}
            {category.NAME}
          </li>
        ))}
      </ul>
    </button>
  );
};
