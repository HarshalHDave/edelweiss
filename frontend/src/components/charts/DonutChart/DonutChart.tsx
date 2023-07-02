import Chart from "react-apexcharts";

export const COLORS = {
  blue: "#39B0EE",
  lightBlue: "#154258",
  darkBlue: "#1B5A76",
  green: "#00AA62",
};

type Props = {
  labels: string[];
  series: number[];
  height?: number;
  width?: number;
  colors?: string[];
};

const DonutChart = ({
  height = 150,
  width = 150,
  labels,
  series,
  colors = [COLORS.blue, COLORS.green, COLORS.darkBlue, COLORS.lightBlue],
}: Props) => {
  return (
    <Chart
      options={{
        colors: colors,
        stroke: {
          show: false,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "75%",
              background: "transparent",
              labels: {
                show: false,
                name: {
                  show: false,
                },
              },
            },
          },
        },
        labels: labels,
        dataLabels: {
          enabled: false,
        },
      }}
      series={series}
      type="donut"
      height={height}
      width={width}
    />
  );
};

export default DonutChart;
