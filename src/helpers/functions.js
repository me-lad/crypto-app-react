//! Seperate numbers 3_by_3
const thousandSeparator = (number) => {
  var sRegExp = new RegExp("(-?[0-9]+)([0-9]{3})"),
    sValue = number + "";

  while (sRegExp.test(sValue)) {
    sValue = sValue.replace(sRegExp, "$1" + "," + "$2");
  }
  return sValue;
};

//! Elapsed time from news publish calculator
const calculateElapsedTime = (dateBySecond) => {
  const currentDateBySecond = new Date().getTime() / 1000;
  const elapsedTimeByMinutes = (currentDateBySecond - dateBySecond) / 60;

  if (elapsedTimeByMinutes < 1) {
    return "Just Now";
  } else if (elapsedTimeByMinutes > 1 && elapsedTimeByMinutes <= 60) {
    return Math.floor(elapsedTimeByMinutes) + " minutes ago";
  } else if (elapsedTimeByMinutes > 60 && elapsedTimeByMinutes <= 1440) {
    return Math.floor(elapsedTimeByMinutes / 60) + " hours ago";
  } else {
    const days = Math.floor(elapsedTimeByMinutes / 1440);
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  }
};

//! Suffix currency
const suffixCurrency = (number) => {
  const str = String(number);
  const length = str.length;
  if (length < 7) {
    return number;
  } else if (length >= 7 && length < 10) {
    if (length === 7) return str.slice(0, 1) + `.${str.slice(1, 3)}` + "M";
    if (length === 8) return str.slice(0, 2) + `.${str.slice(2, 4)}` + "M";
    if (length === 9) return str.slice(0, 3) + `.${str.slice(3, 5)}` + "M";
  } else if (length >= 10 && length < 13) {
    if (length === 10) return str.slice(0, 1) + `.${str.slice(1, 3)}` + "B";
    if (length === 11) return str.slice(0, 2) + `.${str.slice(2, 4)}` + "B";
    if (length === 12) return str.slice(0, 3) + `.${str.slice(3, 5)}` + "B";
  } else if (length >= 13 && length < 16) {
    if (length === 13) return str.slice(0, 1) + `.${str.slice(1, 3)}` + "T";
    if (length === 14) return str.slice(0, 2) + `.${str.slice(2, 4)}` + "T";
    if (length === 15) return str.slice(0, 3) + `.${str.slice(3, 5)}` + "T";
  }
};

//! Chart data converter
const convertChartData = (data, chartRef, duration) => {
  const timeFormatOption =
    duration == 365
      ? {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      : {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };

  const convertedData = data[chartRef].map((item) => {
    return {
      date: new Intl.DateTimeFormat("en-US", timeFormatOption).format(
        new Date(item[0]),
      ),
      value: item[1],
    };
  });
  return convertedData;
};

//! Find max & min value
const findPercent = (data, currentValue) => {
  const values = data.map((item) => item[1]),
    max = Math.max(...values),
    min = Math.min(...values),
    diff = max - min;
  return ((currentValue - min) / diff) * 100;
};

export {
  thousandSeparator,
  calculateElapsedTime,
  suffixCurrency,
  convertChartData,
  findPercent,
};
