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
import { useOutletContext } from "react-router-dom";

const OptionTable = () => {
  const cont = useContext(ctx);
  const options = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAP"];
  const outLetContext = useOutletContext();
  const [searchValue, setSearchValue] = outLetContext.search_context;
  const [ExpiryValue, setExpiryValue] = outLetContext.expiry_context;
  const [IndexOfCont, setIndexOfCont] = useState(0);

  useEffect(() => {
    if (searchValue) setIndexOfCont(options.indexOf(searchValue));
  }, [options, searchValue]);

  return (
    <>
      <TableContainer
        sx={{
          height: "70vh",
        }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }} colSpan={5}>
                CALLS
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Strike Price
              </TableCell>
              <TableCell style={{ textAlign: "center" }} colSpan={5}>
                PUTS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Cute</TableCell>
              <TableCell>IV</TableCell>
              <TableCell>Vol</TableCell>
              <TableCell>OI</TableCell>
              <TableCell>Last</TableCell>
              <TableCell style={{ textAlign: "center" }}>Strike</TableCell>
              <TableCell>Last</TableCell>
              <TableCell>OI</TableCell>
              <TableCell>Vol</TableCell>
              <TableCell>IV</TableCell>
              <TableCell>Cute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cont &&
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
                        <TableRow>
                          <TableCell
                            colSpan={11}
                            style={{ textAlign: "center" }}
                          >
                            Striker -{" "}
                            {cont[IndexOfCont].market_data.at(-1)?.ltp / 100}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  }
                  for (
                    let index = 0;
                    index <
                    Math.max(optionData.call.length, optionData.put.length);
                    index++
                  ) {
                    var call_element: MarketData | undefined = undefined;
                    var put_element: MarketData | undefined = undefined;
                    if (index < optionData.call.length)
                      call_element = optionData.call[index];
                    if (index < optionData.put.length)
                      put_element = optionData.put[index];

                    if (
                      ExpiryValue === "" ||
                      (ExpiryValue && optionData.id.includes(ExpiryValue))
                    ) {
                      console.log(optionData);

                      return (
                        <TableRow>
                          <TableCell>{optionData.id}</TableCell>
                          <TableCell>
                            {call_element ? call_element.vol : ""}
                          </TableCell>
                          <TableCell>
                            {call_element ? call_element.vol : ""}
                          </TableCell>
                          <TableCell>
                            {call_element ? call_element.oi : ""}
                          </TableCell>
                          <TableCell>
                            {call_element
                              ? call_element.ltp.toString() + " " + new Date()
                              : ""}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {optionData.strike}
                          </TableCell>
                          <TableCell>
                            {put_element
                              ? put_element.ltp.toString() + " " + new Date()
                              : ""}
                          </TableCell>
                          <TableCell>
                            {put_element ? put_element.oi : ""}
                          </TableCell>
                          <TableCell>
                            {put_element ? put_element.vol : ""}
                          </TableCell>
                          <TableCell>
                            {put_element ? put_element.vol : ""}
                          </TableCell>
                          <TableCell>{optionData.id}</TableCell>
                        </TableRow>
                      );
                    }
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Legend />
    </>
  );
};

export default OptionTable;
