// @ts-nocheck

import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ctx from "../lib/Context";
import Legend from "./Legend";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LaunchIcon from '@mui/icons-material/Launch';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';


const roundDecimals = (num: number, places: number = 2) => {
  return Math.round(num * 10 ** places) / 10 ** places
};

const OptionTable = () => {
  const cont = useContext(ctx);
  const options = ["FINANCIALS", "ALLBANKS", "MAINIDX", "MIDCAP"];
  const outLetContext = useOutletContext();
  const [searchValue, setSearchValue] = outLetContext.search_context;
  const [ExpiryValue, setExpiryValue] = outLetContext.expiry_context;
  const [IndexOfCont, setIndexOfCont] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    if (searchValue) {
      if (cont) {
        cont.map((company, index) => {
          if (company.name.includes(searchValue)) {
            setIndexOfCont(index)
          }
        })
      }
    }
    else setIndexOfCont(0)
  }, [options, searchValue]);

  useEffect(() => {
    document.getElementById('kuchBhi')?.scrollIntoView();
  }, []);

  if(ExpiryValue && searchValue)
  return (
    <>
      <TableContainer
        sx={{
          height: "64vh",
        }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ borderBottomWidth: 10 }}>
              <TableCell
                style={{ textAlign: "start", fontWeight: "bold" }}
                colSpan={8}
              >
                CALLS
              </TableCell>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                <Box
                  sx={{
                    backgroundColor: "#efeeef",
                    padding: "3px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body1">Spot Price: 19322.55</Typography>
                </Box>
              </TableCell>
              {/* <TableCell style={{ textAlign: "center", width: 80 }}>
                SpotPriceBox
              </TableCell> */}
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                <Box
                  sx={{
                    backgroundColor: "#efeeef",
                    padding: "3px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body1">
                    Future Price : 19505.15
                  </Typography>
                </Box>
              </TableCell>

              <TableCell
                style={{ textAlign: "end", fontWeight: "bold" }}
                colSpan={8}
              >
                PUTS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>More</TableCell>
              {/* <TableCell style={{ textAlign: "center" }}>Timestamp</TableCell> */}
              <TableCell style={{ textAlign: "center" }}>Rho</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vega</TableCell>
              <TableCell style={{ textAlign: "center" }}>Theeta</TableCell>
              <TableCell style={{ textAlign: "center" }}>Gamma</TableCell>
              <TableCell style={{ textAlign: "center" }}>Delta</TableCell>
              {/* <TableCell style={{ textAlign: "center" }}>Bid Qty</TableCell>
              <TableCell style={{ textAlign: "center" }}>Bid</TableCell>
              <TableCell style={{ textAlign: "center" }}>Ask Qty</TableCell>
              <TableCell style={{ textAlign: "center" }}>Ask</TableCell> */}
              <TableCell style={{ textAlign: "center" }}>IV</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vol</TableCell>
              <TableCell style={{ textAlign: "center" }}>OI</TableCell>
              <TableCell style={{ textAlign: "center" }}>LTP</TableCell>
              <TableCell
                style={{ textAlign: "center", backgroundColor: "beige" }}
              >
                Strike
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>LTP</TableCell>
              <TableCell style={{ textAlign: "center" }}>OI</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vol</TableCell>
              <TableCell style={{ textAlign: "center" }}>IV</TableCell>
              {/* <TableCell style={{ textAlign: "center" }}>Ask</TableCell>
              <TableCell style={{ textAlign: "center" }}>Ask Qty</TableCell>
              <TableCell style={{ textAlign: "center" }}>Bid</TableCell>
              <TableCell style={{ textAlign: "center" }}>Bid Qty</TableCell> */}
              <TableCell style={{ textAlign: "center" }}>Delta</TableCell>
              <TableCell style={{ textAlign: "center" }}>Gamma</TableCell>
              <TableCell style={{ textAlign: "center" }}>Theeta</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vega</TableCell>
              <TableCell style={{ textAlign: "center" }}>Rho</TableCell>
              {/* <TableCell style={{ textAlign: "center" }}>Timestamp</TableCell> */}
              <TableCell style={{ textAlign: "center" }}>More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cont &&
              cont[IndexOfCont] &&
              cont[IndexOfCont].options &&
              cont[IndexOfCont].options
                .sort((a, b) => a.strike - b.strike)
                .map((optionData, option_index, arr) => {
                  if (
                    optionData.strike <
                    cont[IndexOfCont].market_data.at(-1)?.ltp / 100 &&
                    option_index + 1 < arr.length &&
                    cont[IndexOfCont].market_data.at(-1)?.ltp / 100 <
                    arr[option_index + 1].strike
                  ) {
                    return (
                      <>
                        <TableRow id="kuchBhi">
                          <TableCell
                            colSpan={31}
                            style={{
                              textAlign: "center",
                              backgroundColor: "purple",
                            }}
                          >
                            Striker -{" "}
                            {cont[IndexOfCont].market_data.at(-1)?.ltp / 100}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  }
                  // for (
                  //   let index = 0;
                  //   index <
                  //   Math.max(optionData.call.length, optionData.put.length);
                  //   index++
                  // ) {
                  var call_element: MarketData | undefined =
                    optionData.call.at(-1);
                  var put_element: MarketData | undefined =
                    optionData.put.at(-1);
                  // if (index < optionData.call.length)
                  //   call_element = optionData.call[index];
                  // if (index < optionData.put.length)
                  //   put_element = optionData.put[index];

                  if (
                    ExpiryValue === "" ||
                    (ExpiryValue && optionData.id.includes(ExpiryValue))
                  ) {
                    console.log(optionData);
                    // console.log(optionData.strike);
                    // console.log(cont[IndexOfCont].market_data.at(-1)?.ltp / 100)

                    return (
                      <TableRow key={optionData.id}>
                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike <
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          <a href={"/stocks/" + optionData.id + "CE"}>
                            {/* {optionData.id} */}
                            <LaunchIcon fontSize="small" />
                          </a>
                        </TableCell>

                        {/* <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {/* Timestamp
                          {call_element}
                        </TableCell> */}

                        {/* Rho */}
                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {call_element?.inferred_data?.rho ? roundDecimals(call_element?.inferred_data?.rho, 3) : "--"}
                        </TableCell>

                        {/* Vega */}
                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {call_element?.inferred_data?.rho ? roundDecimals(call_element?.inferred_data?.rho, 3) : "--"}
                        </TableCell>

                        {/* Theeta */}
                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {call_element?.inferred_data?.theta ? roundDecimals(call_element?.inferred_data?.theta, 3) : "--"}
                        </TableCell>

                        {/* Gamma */}
                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {call_element?.inferred_data?.gamma ? roundDecimals(call_element?.inferred_data?.gamma, 3) : "--"}
                        </TableCell>

                        {/* Delta */}
                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {call_element?.inferred_data?.delta ? roundDecimals(call_element?.inferred_data?.delta, 3) : "--"}
                        </TableCell>

                        {/* <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent" }}>
                          {/* Bid Qty 
                          {call_element?.bid_qty}
                        </TableCell>

                        <TableCell style={{ textAlign: "center" , borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {/* Bid 
                          {call_element?.bid}
                        </TableCell>

                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {/* Ask Qty 
                          {call_element?.ask_qty}
                        </TableCell>

                        <TableCell style={{ textAlign: "center",   borderBottomWidth: 0,backgroundColor:optionData.strike <cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {/* Ask 
                          {call_element?.ask}
                        </TableCell> */}


                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike <
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {call_element?.inferred_data?.implied_volatility? roundDecimals(call_element?.inferred_data?.implied_volatility).toString() + "%" : "--"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike <
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {call_element ? call_element.vol : "--"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike <
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {call_element ? call_element.oi : "--"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike <
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          <Typography>
                            {" "}
                            {call_element
                              ? "₹" + roundDecimals(call_element.ltp / 100).toString()
                              : "L--"}
                          </Typography>

                          <Typography variant="p" style={{ color: call_element?.ltp && call_element?.prev_close_price? (call_element.ltp - call_element.prev_close_price >=0 ? 'green' : 'red') : 'black'}}>
                            {call_element && call_element.prev_close_price
                              ? roundDecimals(
                                call_element.ltp / 100 -
                                call_element.prev_close_price / 100
                              ).toString() +
                              "(" +
                              roundDecimals(
                                ((call_element.ltp -
                                  call_element.prev_close_price) *
                                  100) /
                                call_element.prev_close_price
                              ).toString() +
                              "%)"
                              : "P--"}
                          </Typography>
                        </TableCell>

                        {/* ######################################################################################################## */}
                        {/* ######################################################################################################## */}
                        {/* ######################################################################################################## */}
                        <TableCell
                          style={{
                            textAlign: "center",
                            backgroundColor: "beige",
                            borderBottomWidth: 0,
                          }}
                        >
                          {optionData.strike}
                        </TableCell>
                        {/* ######################################################################################################## */}
                        {/* ######################################################################################################## */}
                        {/* ######################################################################################################## */}

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike >
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          <Typography>
                            {" "}
                            {put_element
                              ? "₹" + roundDecimals(put_element.ltp / 100).toString()
                              : "--"}
                          </Typography>

                          <Typography variant="p" style={{ color: put_element?.ltp && put_element?.prev_close_price ? (put_element.ltp - put_element.prev_close_price >= 0 ? 'green' : 'red') : 'black' }}>
                            {put_element && put_element.prev_close_price
                              ? roundDecimals(
                                put_element.ltp / 100 -
                                put_element.prev_close_price / 100
                              ).toString() +
                              "(" +
                              roundDecimals(
                                ((put_element.ltp -
                                  put_element.prev_close_price) *
                                  100) /
                                put_element.prev_close_price
                              ).toString() +
                              "%)"
                              : "--"}
                          </Typography>
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike >
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {put_element ? put_element.oi : "--"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike >
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {put_element ? put_element.vol : "--"}
                        </TableCell>

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike >
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          {put_element ? put_element.vol : "--"}
                        </TableCell>

                        {/* <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>Ask</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>Ask Qty</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>Bid</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>Bid Qty</TableCell> */}
                        
                        {/* Delta */}
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {put_element?.inferred_data?.delta ? roundDecimals(put_element?.inferred_data?.delta, 3) : "--"}
                        </TableCell>
                        
                        {/* Gamma */}
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {put_element?.inferred_data?.gamma ? roundDecimals(put_element?.inferred_data?.gamma, 3) : "--"}
                        </TableCell>
                        
                        {/* Theeta */}
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {put_element?.inferred_data?.theta ? roundDecimals(put_element?.inferred_data?.theta, 3) : "--"}
                        </TableCell>
                        
                        {/* Vega */}
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {put_element?.inferred_data?.rho ? roundDecimals(put_element?.inferred_data?.rho, 3) : "--"}
                        </TableCell>
                        
                        {/* Rho */}
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>
                          {put_element?.inferred_data?.rho ? roundDecimals(put_element?.inferred_data?.rho, 3) : "--"}
                        </TableCell>






                        {/* <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "greenyellow": "transparent", }}>Timestamp</TableCell> */}

                        <TableCell
                          style={{
                            textAlign: "center",
                            borderBottomWidth: 0,
                            backgroundColor:
                              optionData.strike >
                                cont[IndexOfCont].market_data.at(-1)?.ltp / 100
                                ? "greenyellow"
                                : "transparent",
                          }}
                        >
                          <a href={"/stocks/" + optionData.id + "PE"}>
                            {/* {put_element
                              ?
                              new Date(put_element.timestamp).toString()
                              : "--"} */}
                            <LaunchIcon fontSize="small" />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Legend />
    </>
  );
  return <></>
};

export default OptionTable;
