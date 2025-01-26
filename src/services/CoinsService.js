import axios from "axios";

class CoinsServices {
  constructor() {
    this.coins = [];
    this.isLoading = false;
  }
  async getCoins(order, page) {
    if (this.isLoading) return;
    this.isLoading = true;
    const { data: result } = await this.fetch(order, page);
    this.coins = result;
    this.isLoading = false;
  }

  async fetch(order, page) {
    return axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=25&price_change_percentage=1h%2C24h%2C7d&order=${order}&page=${page}`,
    );
  }
}

export { CoinsServices };
