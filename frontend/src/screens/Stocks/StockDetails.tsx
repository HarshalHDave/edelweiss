import React from "react";
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
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const StockDetails = () => {
  const { id } = useParams();

  const chartData = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
    },
    series: [
      {
        data: [
          {
            x: new Date("2023-07-01").getTime(),
            y: [86.25, 95, 80, 92],
          },
          {
            x: new Date("2023-07-02").getTime(),
            y: [90, 100, 85, 96],
          },
          {
            x: new Date("2023-07-03").getTime(),
            y: [88, 92, 82, 87],
          },
          
        ],
      },
    ],
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Grid container spacing={2} margin={8}>
        <Grid item xs={12} md={3} style={{ position: "sticky", top: 0 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="h6">Nifty 50 Share Price</Typography>
            <Typography variant="body2">Nifty 50 Share Price</Typography>
            <hr />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>₹ 86.25</Typography>
              <Typography sx={{ color: "#388e3c", fontWeight: "bold" }}>
                +53.60 (+164.17%)
              </Typography>
            </Stack>
            <hr />
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
        <Grid item xs={12} md={9}>
          <Typography variant="h4">Nifty 50 Overview</Typography>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="candlestick"
            height={350}
            width="80%"
          />
          <Grid item xs={12} md={9}>
            <TableContainer
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
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
                      Nifty 50 Quick Overview
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid #ccc",
                        textAlign: "end",
                      }}
                    >
                      
                    </TableCell>
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
    </div>
  );
};

export default StockDetails;
