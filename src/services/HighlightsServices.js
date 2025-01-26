import axios from "axios";

class HighlightsServices {
  constructor() {
    this.data = {
      marketCap: null,
      totalVolume: null,
      changeMC: null,
      trendCoins: null,
    };
  }

  async fetch() {
    await this.getGlobalData();
    await this.getTrendingData();
  }

  getGlobalData = async () => {
    const {
      data: { data: result },
    } = await axios.get("https://api.coingecko.com/api/v3/global");
    const btcPrice = (await this.getBtcPrice()).data.bitcoin.usd;
    this.data.marketCap = Math.round(result.total_market_cap.btc * btcPrice);
    this.data.totalVolume = Math.round(result.total_volume.btc * btcPrice);
    this.data.changeMC = result.market_cap_change_percentage_24h_usd;
  };

  getTrendingData = async () => {
    const { data: result } = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
    );
    this.data.trendCoins = result.coins.slice(0, 6);
  };

  getBtcPrice = async () => {
    return await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    );
  };
}

export { HighlightsServices };
