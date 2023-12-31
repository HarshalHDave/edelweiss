import Chart from "react-apexcharts";

type Props = {
  series: any;
  xaxis: string[];
  height?: string | number;
  width?: string | number;
  colors?: string[];
};

const AreaChart = ({
  height = 150,
  width = 400,
  series,
  xaxis,
  colors = ["#00AA00", "#FF4500"],
}: Props) => {
  return (
    <Chart
      options={{
        colors: colors,
        labels: series.map((data: any) => data.toString()),

        tooltip: {
          fillSeriesColor: false,
          x: {
            show: true,
          },
          y: {
            formatter: function (value: any, series: any) {
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
            show: true,
          },
          tooltip: {
            enabled: false,
          },
        },
        grid: {
          borderColor: "#f1f1f1",
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
