import { useEffect, useState } from "react";
import {
  convertChartData,
  findPercent,
  suffixCurrency,
  thousandSeparator,
} from "../helpers/functions";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CoinChart({ data, chartRef, chartDuration, currentValue }) {
  const [chartData, setChartData] = useState();
  const [gradPercent, setGradPercent] = useState();

  useEffect(() => {
    if (data && chartRef) {
      const chartData = convertChartData(data, chartRef, chartDuration);
      const percent = findPercent(data[chartRef], currentValue);
      setGradPercent(percent);
      setChartData(chartData);
    }
  }, [data, chartRef]);

  return (
    <div className="mt-10 w-full md:px-4">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="mx-auto min-h-[375px]"
      >
        <LineChart data={chartData} className="*:overflow-visible">
          <CartesianGrid stroke="#ffffff4f" />
          <XAxis dataKey="date" hide />
          <YAxis
            dataKey="value"
            domain={["auto", "auto"]}
            tick={<CustomAxis />}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend title={chartRef} />} />
          <ReferenceLine
            y={currentValue}
            label={
              <Label
                position="top"
                fill="#eee"
                fontSize="22px"
                fontWeight="bold"
              >
                {chartRef === "prices"
                  ? "Current Price"
                  : chartRef === "market_caps"
                    ? "Current Market Cap"
                    : "Current Total Volume"}
              </Label>
            }
            stroke="#ffffffb0"
            strokeWidth="2px"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15a83c" />
              <stop offset={`${100 - gradPercent}%`} stopColor="#15a83c" />
              <stop offset={`${100 - gradPercent}%`} stopColor="#dc2626" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#gradient)"
            strokeWidth="2px"
            activeDot={{ r: 4 }}
            dot={<CustomDot currentValue={currentValue} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CoinChart;

const CustomDot = (props) => {
  const { cx, cy, stroke, payload, value, currentValue } = props;

  if (value > currentValue) {
    return (
      <svg
        x={cx - 8}
        y={cy - 8}
        width={16}
        height={16}
        fill="#00ff44"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path>
        </g>
      </svg>
    );
  }

  return (
    <svg
      x={cx - 8}
      y={cy - 8}
      width={16}
      height={16}
      fill="#ff0000"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path>
      </g>
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex h-20 w-full flex-col justify-center rounded-sm bg-white px-4 text-black">
        <p>{`date: ${label}`}</p>
        <p>{`value: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = ({ title }) => {
  return (
    <div className="flex justify-center">
      <span>
        {title.slice(0, 1).toUpperCase() + title.slice(1).replace("_", " ")}
      </span>
    </div>
  );
};

const CustomAxis = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y - 12})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#fff">
        ${thousandSeparator(suffixCurrency(payload.value))}
      </text>
    </g>
  );
};
