import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import ctx from "../../lib/Context";

interface Candle {
  x: number;
  y: number[];
}

function splitDataIntoCandles(data : any) {
  const candles = [];
  let currentCandle = null; 

  for (let i = 0; i < data.length; i++) {
    const { ltp, timestamp } = data[i];

    if (!currentCandle) {
      currentCandle = {
        open: ltp,
        close: ltp,
        high: ltp,
        low: ltp,
        timestamp: timestamp,
      };
    } else if (timestamp - currentCandle.timestamp >= 50000) { // 300000 ms = 5 minutes
      candles.push({
        x: currentCandle.timestamp,
        y: [currentCandle.open, currentCandle.high, currentCandle.low, currentCandle.close],
      });
      currentCandle = {
        open: ltp,
        close: ltp,
        high: ltp,
        low: ltp,
        timestamp: timestamp,
      };
    } else {
      currentCandle.close = ltp;
      currentCandle.high = Math.max(currentCandle.high, ltp);
      currentCandle.low = Math.min(currentCandle.low, ltp);
    }
  }

  if (currentCandle) {
    candles.push({
      x: currentCandle.timestamp,
      y: [currentCandle.open, currentCandle.high, currentCandle.low, currentCandle.close],
    });
  }

  return candles;
}
const StockDetails = () => {
  const { id } = useParams();
  const context = useContext(ctx);
  const [ChartData, setChartData] = useState<Candle[]>([]);
  useEffect(() => {
    if (id && context) {
      const isCall = id.slice(-2) === "CE";
      if (isCall) {
        context.map((company) => {
          const candle_data: Candle[] = [];
          company.options.map((option_data) => {
            if (option_data.id === id.slice(0, id.length - 2))
              if (isCall) {
                option_data.call.map((val, index, arr) => {
                  // if (index !== arr.length - 1)
                  //   candle_data.push({
                  //     x: new Date(Number(val.timestamp)).getTime(),
                  //     y: [
                  //       arr[index].ltp,
                  //       opt_arr[0].ltp,
                  //       opt_arr[opt_arr.length - 1].ltp,
                  //       arr[index + 1].ltp,
                  //     ],
                  //   });
                });
                // splitDataIntoCandles(option_data.call)
                //@ts-ignore
                setChartData(splitDataIntoCandles(option_data.call));
              } else {
                option_data.put.map((val) => {
                  candle_data.push({
                    x: new Date(Number(val.timestamp)).getTime(),
                    y: [val.ltp, val.bid, val.prev_close_price / 100, val.ask],
                  });
                });
                setChartData(candle_data);
              }
          });
        });
        console.log(ChartData);
      }
    }
  }, [, context]);

  return (
    // <div style={{ overflowX: "hidden" }}>
    <Grid container spacing={0}>
      <Grid item xs={12} md={3}>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            "@media (max-width: 425px)": {
              marginBottom: "35px",
              justifyContent: "center",
              // alignItems: "center",
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              component={Link}
              to="/opt_table"
              style={{ marginRight: "8px", backgroundColor: "#f5f5f5" }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">{id}</Typography>
          </Stack>
          <Typography variant="body2">{id}</Typography>
          <Divider
            sx={{
              height: "1px",
              backgroundColor: "#ccc",
              marginBottom: "10px",
              "@media (max-width: 425px)": {
                width: "63%",
              },
              "@media (max-width: 768px)": {
                width: "32%",
              },
            }}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>₹ 86.25</Typography>
            <Typography sx={{ color: "#388e3c", fontWeight: "bold" }}>
              +53.60 (+164.17%)
            </Typography>
          </Stack>
          <Divider
            sx={{
              height: "1px",
              backgroundColor: "#ccc",
              marginBottom: "10px",
              "@media (max-width: 425px)": {
                width: "63%",
              },
              "@media (max-width: 768px)": {
                width: "32%",
              },
            }}
          />
          <Stack direction="column" spacing={1}>
            <Typography variant="body2">Company Overview</Typography>
            <Typography variant="body2">Option Chains</Typography>
            <Link to="/calculator" style={{ textDecoration: "none" }}>
              <Typography variant="body2">Investment Calculators</Typography>
            </Link>
            <Typography variant="body2">FAQ's</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={9} sm={12}>
        <Typography variant="h4">{id}</Typography>
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
            },
          }}
          series={[{
            data: ChartData
          }]}
          type="candlestick"
          height={350}
          width="100%"
        />
        <Grid item xs={12} md={12} sm={12}>
          <TableContainer
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {id}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Open
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    ₹ 121.00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Close
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    ₹ 100.95
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Circuit Range
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    ₹ 606.80 - ₹ 0.05
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Day Range
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    ₹ 121.00 - ₹ 221.35
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Volume
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    1,56,72,500.00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Avg. Traded
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    ₹ 185.03
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Spot
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    207.35
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    OI
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    8,77,950.00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Change in Ol
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #ccc", textAlign: "end" }}
                  >
                    -10,82,900.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
    // </div>
  );
};

export default StockDetails;
