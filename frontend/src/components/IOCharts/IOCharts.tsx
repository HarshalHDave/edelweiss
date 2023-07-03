import AreaChart from "../charts/AreaChart/AreaChart";

type Props = {};

const IOCharts = (props: Props) => {
  return (
    <div>
      <AreaChart
        xaxis={[
          "2021-01-01",
          "2021-01-02",
          "2021-01-03",
          "2021-01-04",
          "2021-01-05",
          "2021-01-06",
        ]}
        width={400}
        height={300}
        series={[
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60],
          },
        ]}
      />
    </div>
  );
};

export default IOCharts;
