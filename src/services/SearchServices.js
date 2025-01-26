import axios from "axios";

class SearchServices {
  constructor() {
    this.searchResponse = [];
  }
  async search(query) {
    const {
      data: { coins: result },
    } = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
    );
    this.searchResponse = result;
  }
}

export { SearchServices };
