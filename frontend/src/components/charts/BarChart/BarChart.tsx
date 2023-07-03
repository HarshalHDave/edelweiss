import Chart from "react-apexcharts";
import { COLORS } from "../DonutChart/DonutChart";

type Props = {
  series: { name: string; data: number[] }[];
  xaxis: string[];
  height?: string | number;
  width?: string | number;
  colors?: string[];
};

const BarChart = ({
  series,
  xaxis,
  height = 150,
  width,
  colors = ["#00AA00", "#FF4500"],
}: Props) => {
  return (
    <Chart
      type="bar"
      options={{
        tooltip: {
          fillSeriesColor: false,
          x: {
            show: true,
          },
        },
        fill: {
          colors: colors,
        },
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: COLORS.green,
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
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            colors: {},
          },
        },
        xaxis: {
          categories: xaxis,
          tickPlacement: "on",
          labels: {
            show: true,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#8e8da4",
            },
          },
        },
        legend: {
          show: true,
        },
      }}
      series={series}
      height={height}
      width={width}
    ></Chart>
  );
};

export default BarChart;
