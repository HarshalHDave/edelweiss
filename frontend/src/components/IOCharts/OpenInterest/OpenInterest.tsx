import React, { useContext, useEffect } from "react";
import AreaChart from "../../charts/AreaChart/AreaChart";
import ctx, { Data } from "../../../lib/Context";

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
    const data = getOptionData(context);
    setXaxis(data[0].map((strikePrice) => strikePrice.toString()));
    setSeries1(data[1]);
    setSeries2(data[2]);
  }, [context]);

  function getOptionData(data: Data): [string[], number[], number[]] {
    const optionStrikePrices: string[] = [];
    const optionCallLastOi: number[] = [];
    const optionPutLastOi: number[] = [];

    if (data && Array.isArray(data)) {
      data.forEach((company: Company) => {
        if (company.options && Array.isArray(company.options)) {
          company.options?.forEach((option: Option) => {
            const callLastIndex = option?.call?.length - 1;
            const putLastIndex = option?.put?.length - 1;

            optionStrikePrices.push(option?.id);
            optionCallLastOi.push(option?.call[callLastIndex]?.oi || 0);
            optionPutLastOi.push(option?.put[putLastIndex]?.oi || 0);
          });
        }
      });
    }

    return [optionStrikePrices, optionCallLastOi, optionPutLastOi];
  }

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
