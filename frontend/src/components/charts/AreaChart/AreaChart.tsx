import Chart from "react-apexcharts";
import { COLORS } from "../DonutChart/DonutChart";

type Props = {
  series: any;
  xaxis: string[];
  // yaxis: number[];
  height?: number;
  width?: number;
  colors?: string[];
};

const AreaChart = ({
  height = 150,
  width = 400,
  series,
  xaxis,
  // yaxis,
  colors = ["#257b8a"],
}: Props) => {
  return (
    <Chart
      options={{
        colors: colors,
        // labels: series.data.map(String),

        tooltip: {
          fillSeriesColor: false,
          x: {
            show: false,
          },
          y: {
            formatter: function (value : any, series :any) {
              return value?.toString() || "";
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
          colors: colors,
        },
        xaxis: {
          categories: xaxis,
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        grid: {
          borderColor: COLORS["lightBlue"],
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          show: false,
          tooltip: {
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
      }}
      series={series}
      type="area"
      height={height}
      width={width}
    />
  );
};

export default AreaChart;
