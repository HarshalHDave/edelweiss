import React, { useContext, useEffect } from "react";
import ctx, { Data } from "../../../lib/Context";
import { useOutletContext } from "react-router-dom";
import BarChart from "../../charts/BarChart/BarChart";

type Props = {};

const Ltp = (props: Props) => {
  const context = useContext(ctx);
  const outLetContext: {
    search_context: [
      string,
      React.Dispatch<React.SetStateAction<string | null>>
    ];
    expiry_context: [string, React.Dispatch<React.SetStateAction<string>>];
  } = useOutletContext();
  const [searchValue, setSearchValue] = outLetContext.search_context;
  const [ExpiryValue, setExpiryValue] = outLetContext.expiry_context;
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
    console.log(searchValue, ExpiryValue);
  }, [context, searchValue, ExpiryValue]);

  function getOptionData(data: Data): [string[], number[], number[]] {
    const optionStrikePrices: string[] = [];
    const optionCallLastOi: number[] = [];
    const optionPutLastOi: number[] = [];

    if (data && Array.isArray(data)) {
      data.forEach((company: Company) => {
        if (company.options && Array.isArray(company.options)) {
          if (searchValue) {
            if (!company.name.includes(searchValue)) return;
          }

          const sortedOptions = company.options.sort((a: Option, b: Option) => {
            return a.strike - b.strike;
          });

          sortedOptions.forEach((option: Option) => {
            const callLastIndex = option?.call?.length - 1;
            const putLastIndex = option?.put?.length - 1;
            if (ExpiryValue) {
              if (!option.id.includes(ExpiryValue)) return;
            }
            optionStrikePrices.push(option?.strike.toString() || "");
            optionCallLastOi.push(option?.call[callLastIndex]?.ltp || 0);
            optionPutLastOi.push(option?.put[putLastIndex]?.ltp || 0);
          });
        }
      });
    }

    return [optionStrikePrices, optionCallLastOi, optionPutLastOi];
  }

  if (ExpiryValue && searchValue)
    return (
      <BarChart
        xaxis={xaxis}
        series={[
          {
            name: "call",
            data: series1,
            color: "#00AA00",
          },
          {
            name: "put",
            data: series2,
            color: "#FF4500",
          },
        ]}
        width={"100%"}
        height={300}
        colors={["#00AA00", "#FF4500"]}
        title="LTP"
      />
    );
  return <></>;
};

export default Ltp;
