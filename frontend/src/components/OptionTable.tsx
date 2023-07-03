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
      if(cont){
        cont.map((company , index) =>{
          if(company.name.includes(searchValue)){
            setIndexOfCont(index)
          }
        } )
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
              <TableCell style={{ textAlign: "center" }} colSpan={5}>
                CALLS
              </TableCell>
              <TableCell style={{ textAlign: "center", width: 80 }}>
                Strike Price
              </TableCell>
              <TableCell style={{ textAlign: "center" }} colSpan={5}>
                PUTS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Cute</TableCell>
              <TableCell style={{ textAlign: "center" }}>IV</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vol</TableCell>
              <TableCell style={{ textAlign: "center" }}>OI</TableCell>
              <TableCell style={{ textAlign: "center" }}>LTP</TableCell>
              <TableCell style={{ textAlign: "center", backgroundColor: 'beige' }}>Strike</TableCell>
              <TableCell style={{ textAlign: "center" }}>LTP</TableCell>
              <TableCell style={{ textAlign: "center" }}>OI</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vol</TableCell>
              <TableCell style={{ textAlign: "center" }}>IV</TableCell>
              <TableCell style={{ textAlign: "center" }}>Cute</TableCell>
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
                        <TableRow id='kuchBhi'>
                          <TableCell
                            colSpan={11}
                            style={{ textAlign: "center", backgroundColor: 'purple' }}
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
                  var call_element: MarketData | undefined = optionData.call.at(-1);
                  var put_element: MarketData | undefined = optionData.put.at(-1);
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
                      <TableRow>
                        <TableCell  style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike < cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          <a href={'/stocks/'+optionData.id+"CE"}>
                          {optionData.id}
                          </a>
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike < cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {/* {call_element ? call_element.iv : ""} */}
                          {"IV"}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike < cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {call_element ? call_element.vol : "--"}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike < cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {call_element ? call_element.oi : "--"}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike < cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          <Typography> {call_element ?
                            "₹" + (call_element.ltp / 100).toString()
                            : "L--"}
                          </Typography>

                          <Typography>{call_element && call_element.prev_close_price ?
                            (call_element.ltp / 100 - call_element.prev_close_price / 100).toString() + " " +
                            (((call_element.ltp - call_element.prev_close_price) * 100) / call_element.prev_close_price).toString() + "%" : "P--"}
                          </Typography>

                          <Typography>{call_element?.ltp?.toString() + "   " + call_element?.prev_close_price?.toString()}
                          </Typography>
                        </TableCell>

                        <TableCell style={{ textAlign: "center", backgroundColor: 'beige', borderBottomWidth: 0 }}>
                          {optionData.strike}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike > cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          <Typography> {put_element ?
                            "₹" + (put_element.ltp / 100).toString()
                            : "L--"}
                          </Typography>

                          <Typography> {put_element && put_element.prev_close_price ?
                            ((put_element.prev_close_price - put_element.ltp) / put_element.prev_close_price).toString() + "%" : "P--"}
                          </Typography>
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike > cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {put_element ? put_element.oi : "--"}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike > cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {put_element ? put_element.vol : "--"}
                        </TableCell>

                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike > cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                          {put_element ? put_element.vol : "--"}
                        </TableCell>

                        <TableCell  style={{ textAlign: "center", borderBottomWidth: 0, backgroundColor: optionData.strike > cont[IndexOfCont].market_data.at(-1)?.ltp / 100 ? 'greenyellow' : 'transparent' }}>
                        <a href={'/stocks/'+optionData.id+"PE"}>
                          {put_element
                            ? put_element.ltp.toString() + " " + new Date(put_element.timestamp)
                            : "--"}
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer >
      <Legend />
    </>
  );
  return <></>
};

export default OptionTable;
