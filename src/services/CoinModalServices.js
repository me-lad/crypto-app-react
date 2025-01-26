import axios from "axios";

class CoinModalServices {
  async getCoinData(id) {
    const { data: result } = await this.fetch(id);
    return result;
  }

  async getChartData(id, duration) {
    const { data: result } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${duration}`,
    );
    return result;
  }

  async fetch(id) {
    return axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
    );
  }
}

export { CoinModalServices };
