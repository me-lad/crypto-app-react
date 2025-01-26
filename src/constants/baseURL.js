const baseSparkChart = "https://images.cryptocompare.com/sparkchart";

const coinChartMaker = (coinSymbol) => {
  return `${baseSparkChart}/${coinSymbol.toUpperCase()}/USD/latest.png`;
};

export { coinChartMaker };
