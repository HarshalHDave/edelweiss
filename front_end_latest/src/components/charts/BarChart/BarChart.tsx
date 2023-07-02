import Chart from "react-apexcharts";
import { COLORS } from "../DonutChart/DonutChart";

type Props = {
  series: { name: string; data: number[] }[];
  labels: string[];
  height?: number;
  width: number;
  colors?: string[];
};

const BarChart = ({
  series,
  labels,
  height = 150,
  width,
  colors = [COLORS.blue, COLORS.darkBlue, COLORS.green],
}: Props) => {
  return (
    <Chart
      type="bar"
      options={{
        tooltip: {
          fillSeriesColor: false,
          x: {
            show: false,
          },
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
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        xaxis: {
          categories: labels,
          tickPlacement: "on",
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: COLORS.green,
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
