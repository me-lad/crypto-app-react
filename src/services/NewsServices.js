import { apiKey_compare } from "../constants/APIs";

class NewsServices {
  constructor() {
    this.base_url =
      "https://data-api.cryptocompare.com/news/v1/article/list?sortOrder=latest";
    this.currentUrl;
  }
  async getInitialNews(
    language,
    limit,
    filterQuery = { value: "", lang: "en" },
  ) {
    const confirmedQuery =
      filterQuery.lang === language ? filterQuery.value : "";
    this.currentUrl = `${this.base_url}&lang=${language.toUpperCase()}${confirmedQuery}`;
    const result = await this.fetch(this.currentUrl, limit);
    const { Data: data } = await result.json();
    return data;
  }

  async getSubsequentNews(lastPublish) {
    const url = `${this.currentUrl}&to_ts=${lastPublish}`;
    const result = await this.fetch(url, 21);
    const { Data: data } = await result.json();
    return data.slice(1);
  }

  async fetch(url, limit) {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Apikey ${apiKey_compare}`,
      },
    };
    return fetch(`${url}&limit=${limit}`, options);
  }
}

export { NewsServices };
