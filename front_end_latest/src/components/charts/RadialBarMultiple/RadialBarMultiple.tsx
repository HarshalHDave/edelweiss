import Chart from "react-apexcharts";
import { COLORS } from "../DonutChart/DonutChart";

type Props = {
  series: number[];
  colors?: string[];
  width?: number;
  hollowSize?: number;
};

const RadialBarMultiple = ({
  width = 130,
  hollowSize = 20,
  colors = [COLORS.blue, COLORS.darkBlue],
  series,
}: Props) => {
  return (
    <Chart
      options={{
        colors: colors,
        grid: {
          padding: {
            left: -10,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: hollowSize + "%",
            },
            dataLabels: {
              show: false,
            },
            track: {
              background: COLORS.lightBlue,
            },
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Progress"],
      }}
      series={series}
      type="radialBar"
      width={width}
    />
  );
};

export default RadialBarMultiple;
