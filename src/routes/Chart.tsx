import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext() as ChartProps;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const candleData = data?.map((data: IHistorical) => ({
    x: new Date(data.time_open).getTime(),
    y: [
      data.open.toFixed(3),
      data.high.toFixed(3),
      data.low.toFixed(3),
      data.close.toFixed(3),
    ],
  }));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                name: "Price",
                data: candleData,
              },
            ] as unknown as number[]
          }
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              labels: { formatter: (price: number) => `$ ${price.toFixed(0)}` },
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              categories: data?.map((time) => time.time_close),
            },

            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
