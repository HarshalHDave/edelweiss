// @ts-nocheck
import React, { useContext, useEffect, useMemo, useState } from "react";
import stockCtx from "../lib/stocks";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ctx from "../lib/spot_stocks";
import Legend from "./Legend";

const OptionTable = () => {
  const cont = useContext(stockCtx);
  const spot_stock = useContext(ctx);
  return (
    <>
      {/* <table>
        <th>
          <td>Imp Vol</td>
          <td>Vol</td>
          <td>OI</td>
          <td>Last</td>
          <td>LTP</td>
        </th>
        {cont &&
          cont[0].options.map((val, index) => (
            <tr>
              <td>{val.data ? val.trading_symbol : ""}</td>
              <td>{val.data ? val.strike : ""}</td>
              <td>{val.data ? val.expiry_date : ""}</td>
              <td>{val.data ? val.type : ""}</td>
              <td>
                {val.data && val.data.at(-1) && val.data.at(-1)
                  ? // @ts-ignore
                    val.data.at(-1).ltp.toString()
                  : "n"}
              </td>
            </tr>
          ))}
      </table> */}
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "center" }} colSpan={5}>
              CALLS
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>Strike Price</TableCell>
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
            spot_stock &&
            cont[0].options
              .sort((a, b) => {
                if (b.strike && a.strike) {
                  return b.strike - a.strike;
                }
                return 0;
              })
              .map((val, index, arr) => {
                console.log(
                  spot_stock[2].name,
                  spot_stock[2].data.at(-1)?.ltp / 100
                );
                if (
                  val.strike &&
                  spot_stock.length > 0 &&
                  val.strike > spot_stock[2].data.at(-1)?.ltp / 100 &&
                  index + 1 < arr.length &&
                  arr[index + 1].strike &&
                  // @ts-ignore
                  spot_stock[2].data.at(-1)?.ltp / 100 > arr[index + 1].strike
                ) {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          {val.data ? val.trading_symbol : ""}
                        </TableCell>
                        <TableCell>{val.data ? val.type : ""}</TableCell>
                        <TableCell>{val.data ? val.expiry_date : ""}</TableCell>
                        <TableCell>{val.data ? val.type : ""}</TableCell>
                        <TableCell>
                          {val.data && val.data.at(-1) && val.data.at(-1)
                            ? // @ts-ignore
                              val.data.at(-1).ltp.toString()
                            : "n"}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {val.strike}
                        </TableCell>
                        <TableCell>
                          {val.data ? val.trading_symbol : ""}
                        </TableCell>
                        <TableCell>{val.data ? val.type : ""}</TableCell>
                        <TableCell>{val.data ? val.expiry_date : ""}</TableCell>
                        <TableCell>{val.data ? val.type : ""}</TableCell>
                        <TableCell>
                          {val.data && val.data.at(-1) && val.data.at(-1)
                            ? // @ts-ignore
                              val.data.at(-1).ltp.toString()
                            : "n"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={11}>Striker - {spot_stock[2].data.at(-1)?.ltp / 100}</TableCell>
                      </TableRow>
                    </>
                  );
                }
                return (
                  <TableRow>
                    <TableCell>{val.data ? val.trading_symbol : ""}</TableCell>
                    <TableCell>{val.data ? val.type : ""}</TableCell>
                    <TableCell>{val.data ? val.expiry_date : ""}</TableCell>
                    <TableCell>{val.data ? val.type : ""}</TableCell>
                    <TableCell>
                      {val.data && val.data.at(-1) && val.data.at(-1)
                        ? // @ts-ignore
                          val.data.at(-1).ltp.toString()
                        : "n"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {val.strike}
                    </TableCell>
                    <TableCell>{val.data ? val.trading_symbol : ""}</TableCell>
                    <TableCell>{val.data ? val.type : ""}</TableCell>
                    <TableCell>{val.data ? val.expiry_date : ""}</TableCell>
                    <TableCell>{val.data ? val.type : ""}</TableCell>
                    <TableCell>
                      {val.data && val.data.at(-1) && val.data.at(-1)
                        ? // @ts-ignore
                          val.data.at(-1).ltp.toString()
                        : "n"}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </TableContainer>
      <Legend />
      {/* <DataGrid
        rows={Rows}
        columns={Columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      /> */}
    </>
  );
};

export default OptionTable;
