import { apiKey_compare } from "../constants/APIs";

class NewsPageServices {
  constructor() {
    this.sources = [];
    this.categories = [];
    this.languages = [
      {
        name: "English",
        code: "en",
      },
      {
        name: "Espanol",
        code: "es",
      },
      {
        name: "Turkish",
        code: "tr",
      },
      {
        name: "French",
        code: "fr",
      },
    ];
  }
  async getSources(lang) {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Apikey ${apiKey_compare}`,
      },
    };
    const result = await fetch(
      `https://data-api.cryptocompare.com/news/v1/source/list?lang=${lang.toUpperCase()}&source_type=RSS&status=ACTIVE`,
      options,
    );
    const { Data: data } = await result.json();
    this.sources = data;
  }

  async getCategories() {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Apikey ${apiKey_compare}`,
      },
    };
    const result = await fetch(
      "https://data-api.cryptocompare.com/news/v1/category/list?status=ACTIVE",
      options,
    );
    const { Data: data } = await result.json();
    this.categories = data;
  }
}

export { NewsPageServices };
