import Chart from "react-apexcharts";
import { COLORS } from "../DonutChart/DonutChart";

type Props = {
  series: { name: string; data: number[] }[];
  height?: number;
  width: number;
  colors?: string[];
  areaFormat?: boolean;
};

const LineChart = ({
  height = 150,
  width,
  series,
  colors = [COLORS.blue, COLORS.green, COLORS.darkBlue],
  areaFormat = false,
}: Props) => {
  return (
    <Chart
      options={{
        tooltip: {
          fillSeriesColor: false,
          x: {
            show: false,
          },
        },
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: colors,
          width: 2,
        },
        grid: {
          borderColor: COLORS.blue,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          tickPlacement: "on",
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          show: false,
          title: {
            text: "Temperature",
          },
          min: 5,
          max: 40,
          tooltip: {
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
      }}
      series={series}
      type={areaFormat ? "area" : "line"}
      height={height}
      width={width}
    />
  );
};

export default LineChart;
