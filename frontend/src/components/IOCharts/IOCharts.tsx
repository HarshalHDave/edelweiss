import BarChart from "../charts/BarChart/BarChart";
import DonutChart from "../charts/DonutChart/DonutChart";
import LineChart from "../charts/LineChart/LineChart";
import Ltp from "./Ltp/Ltp";
import OpenInterest from "./OpenInterest/OpenInterest";
import { Box, Divider, Unstable_Grid2 as Grid } from "@mui/material";

type Props = {};

const IOCharts = (props: Props) => {
  return (
    <div
      style={{
        overflow: "scroll",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Box sx={{ paddingInline: "80px", mt: 3 }}>
        <OpenInterest />
      </Box>

      <Divider sx={{ my: 5 }} />

      <Box sx={{ paddingInline: "80px" }}>
        <Ltp />
      </Box>

      {/* <div>
        <BarChart
          width={400}
          height={300}
          series={[
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60],
            },
          ]}
          labels={[
            "2021-01-01",
            "2021-01-02",
            "2021-01-03",
            "2021-01-04",
            "2021-01-05",
            "2021-01-06",
          ]}
        />
      </div>

      <div>
        <DonutChart
          width={400}
          height={300}
          series={[30, 40, 45, 50, 49, 60]}
          labels={[
            "2021-01-01",
            "2021-01-02",
            "2021-01-03",
            "2021-01-04",
            "2021-01-05",
            "2021-01-06",
          ]}
        />
      </div>

      <div>
        <LineChart
          series={[
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60].map((x) => x - 20),
            },
          ]}
          labels={[
            "2021-01-01",
            "2021-01-02",
            "2021-01-03",
            "2021-01-04",
            "2021-01-05",
            "2021-01-06",
          ]}
          width={400}
          height={300}
        />
      </div> */}
    </div>
  );
};

export default IOCharts;
