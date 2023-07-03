import React, { useContext, useEffect } from "react";
import AreaChart from "../../charts/AreaChart/AreaChart";
import ctx from "../../../lib/Context";

type Props = {};

const OpenInterest = (props: Props) => {
  const context = useContext(ctx);

  const [xaxis, setXaxis] = React.useState<string[]>([
    "2021-01-01",
    "2021-01-02",
    "2021-01-03",
    "2021-01-04",
    "2021-01-05",
    "2021-01-06",
  ]);
  const [series1, setSeries1] = React.useState<number[]>([
    30, 40, 45, 50, 49, 60,
  ]);
  const [series2, setSeries2] = React.useState<number[]>([
    60, 50, 55, 40, 41, 30,
  ]);

  useEffect(() => {
    console.log(context);
  }, [context]);

  return (
    <AreaChart
      xaxis={xaxis}
      series={[
        {
          name: "series-1",
          data: series1,
        },
        {
          name: "series-2",
          data: series2,
        },
      ]}
      width={"100%"}
      height={300}
    />
  );
};

export default OpenInterest;
