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
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import ctx from "../../lib/Context";
import RiskAssessment from "./RiskAssessment/RiskAssessment";
import AIStrikePrice from "./AIStrikePrice/AIStrikePrice";

interface Candle {
  x: number;
  y: number[];
}

function splitDataIntoCandles(data: MarketData[]) {
  const candles = [];
  let currentCandle = null;

  for (let i = 0; i < data.length; i++) {
    const marketData = data[i];
    const ltp = marketData.ltp / 100;
    const timestamp = data[i].timestamp as number;

    if (!currentCandle) {
      currentCandle = {
        open: ltp,
        close: ltp,
        high: ltp,
        low: ltp,
        timestamp: timestamp as number,
      };
    } else if (timestamp - currentCandle.timestamp >= 150000) {
      // 300000 ms = 5 minutes
      candles.push({
        x: currentCandle.timestamp,
        y: [
          currentCandle.open,
          currentCandle.high,
          currentCandle.low,
          currentCandle.close,
        ],
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
      y: [
        currentCandle.open,
        currentCandle.high,
        currentCandle.low,
        currentCandle.close,
      ],
    });
  }
  return candles;
}

interface OptionDisplay {
  id: string;
  ltp: number;
  strike: number;
  type: "cal" | "put";
}

function extractDateString(str: string): string | null {
  const regex = /[0-9]{2}[A-Z]{3}[0-9]{2}/;
  const matches = str.match(regex);

  if (matches && matches.length > 0) {
    return matches[0];
  }

  return null;
}

const StockDetails = () => {
  const context = useContext(ctx);

  // const { companyIndex, type, index } = useParams();
  const { symbol } = useParams();
  const [AIValue, setAIValue] = useState("");
  useEffect(() => {
    fetch("http://localhost:8008/api/predict/" + symbol).then(async (res) => {
      const aiVal:
        | { error: string; message: string; prediction: number }
        | undefined = await res.json();
      if (aiVal && aiVal.prediction) {
        setAIValue(aiVal.prediction.toString());
      }
    });
  }, []);
  // const _companyIndex = companyIndex ? parseInt(companyIndex) : undefined;
  // const _index = index ? parseInt(index) : undefined;

  const [ChartData, setChartData] = useState<Candle[]>([]);
  const [marketData, setMarketData] = useState<MarketData[] | undefined>(
    undefined
  );

  const [type, setType] = useState<string>("c");
  const [company, setCompany] = useState<Company | null>(null);
  const [option, setOption] = useState<Option | Future | null>(null);
  const [calls, setCalls] = useState<OptionDisplay[] | null>(null);
  const [puts, setPuts] = useState<OptionDisplay[] | null>(null);
  const avgTraded = (marketData: MarketData) => {
    let sum = 0;
  };
  useEffect(() => {
    if (
      symbol &&
      context
      // _companyIndex !== undefined &&
      // type &&
      // _index !== undefined &&
    ) {
      const id = symbol.slice(0, -2);
      const _type = symbol.slice(-2);
      if (_type == "CE") setType("c");
      else if (_type == "PE") setType("p");
      else setType("f");

      for (let i = 0; i < context.length; i++) {
        let _company = context[i];
        if (_type == "XX") {
          const maybe = _company.futures.find((f) => f.id === id) ?? null;
          if (maybe) {
            setOption(maybe);
            setMarketData(maybe.market_data);
            setCompany(_company);
            break;
          }
        } else {
          const maybe = _company.options.find((o) => o.id === id) ?? null;
          if (maybe) {
            setOption(maybe);
            if (_type == "CE") setMarketData(maybe.call);
            else setMarketData(maybe.put);
            setCompany(_company);
            break;
          }
        }
      }
    }
  }, [symbol, context]);

  useEffect(() => {
    if (company && option && type) {
      if (type != "f") {
        setCalls(
          company.options
            .filter(
              (o) => o.call.length > 0 && o.expiry_date == option.expiry_date
            )
            .map((o) => ({
              id: o.id,
              strike: o.strike,
              ltp: o.call.at(-1)?.ltp!,
              type: "cal",
            }))
        );
        setPuts(
          company.options
            .filter(
              (o) => o.put.length > 0 && o.expiry_date == option.expiry_date
            )
            .map((o) => ({
              id: o.id,
              ltp: o.put.at(-1)?.ltp!,
              strike: o.strike,
              type: "put",
            }))
        );
      }
    }
    // }, [_companyIndex, type, _index, context]);
  }, [company, option, type]);

  useEffect(() => {
    if (marketData) setChartData(splitDataIntoCandles(marketData));
  }, [marketData]);

  const getBackLink = () => {
    if (company?.name && option?.id) {
      return `/opt_table?stockUrl=${
        company?.name
      }&expiryUrl=${extractDateString(option?.id)}`;
    } else {
      return "/opt_table";
    }
  };

  if (!marketData)
    return (
      <>
        <IconButton
          component={Link}
          to={getBackLink()}
          style={{
            marginRight: "8px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            w: "100vw",
            h: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );

  return (
    // <div style={{ overflowX: "hidden" }}>
    <Grid container spacing={0} sx={{ p: 2 }}>
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
            mr: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 5 }}>
            <IconButton
              component={Link}
              to={getBackLink()}
              style={{
                marginRight: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography sx={{ fontSize: "1.5rem" }}>{option?.id}</Typography>
          </Stack>
          <Typography sx={{ fontSize: "1rem" }}>{option?.id}</Typography>
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

          <Box sx={{ marginTop: 5 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>₹{marketData.at(-1)!.ltp}</Typography>
              <Typography sx={{ color: "#388e3c", fontWeight: "bold" }}>
                +53.60 (+164.17%)
              </Typography>
            </Stack>
            <Box sx={{ mt: 5 }}></Box>
          </Box>

          <AIStrikePrice value={AIValue} />

          {type !== "f" && (
            <RiskAssessment
              spot_price={company!.market_data.at(-1)?.ltp! / 100}
              strike_price={option!.strike}
              type={type == "c" ? "cal" : "put"}
              puts={puts!}
              calls={calls!}
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={9} sm={12}>
        <Typography sx={{ fontSize: "1.5rem" }}>Last Traded Price</Typography>
        <ReactApexChart
          options={{
            chart: {
              type: "candlestick",
            },
          }}
          series={[
            {
              data: ChartData,
            },
          ]}
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
                    {option?.id}
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
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    ₹{" "}
                    {marketData &&
                      marketData[0] &&
                      marketData[0].ltp &&
                      marketData[0].ltp / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Close
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    ₹{" "}
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].ltp &&
                      marketData[marketData.length - 1].ltp / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Day Range
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    ₹{" "}
                    {marketData &&
                      marketData.sort((a, b) => a.ltp - b.ltp)[0].ltp /
                        100}{" "}
                    - ₹{" "}
                    {marketData &&
                      marketData.sort((a, b) => a.ltp - b.ltp)[
                        marketData.length - 1
                      ].ltp / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Volume
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].vol}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Ask Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].ask_qty}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Ask Price
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    ₹{" "}
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].ask / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Bid Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].bid_qty}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Bid Price
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    ₹
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].bid / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    OI
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].oi &&
                      marketData[marketData.length - 1].prev_oi &&
                      Math.abs(
                        marketData[marketData.length - 1].oi -
                          marketData[marketData.length - 1].prev_oi
                      ) / 100}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                    Change in OI
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "end",
                    }}
                  >
                    {marketData &&
                      marketData[marketData.length - 1] &&
                      marketData[marketData.length - 1].oi / 100}
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
