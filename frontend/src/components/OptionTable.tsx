// @ts-nocheck

import "./OptionTable.css";

import { useContext, useEffect, useState } from "react";
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
import { Chip, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const roundDecimals = (num: number, places: number = 2) => {
  return Math.round(num * 10 ** places) / 10 ** places;
};

const tableCellTypographyStyle = { fontWeight: "800", color: "#24242A" };

const OptionTable = () => {
  const cont = useContext(ctx);
  const options = ["FINANCIALS", "ALLBANKS", "MAINIDX", "MIDCAP"];
  const outLetContext = useOutletContext();
  const [searchValue, setSearchValue] = outLetContext.search_context;
  const [ExpiryValue, setExpiryValue] = outLetContext.expiry_context;
  const [IndexOfCont, setIndexOfCont] = useState(-1);

  useEffect(() => {
    if (searchValue) {
      if (cont) {
        cont.forEach((company, index) => {
          if (company.name.includes(searchValue)) {
            setIndexOfCont(index);
            return;
          }
        });
      }
    } else setIndexOfCont(-1);
  }, [options, searchValue]);

  useEffect(() => {
    document.getElementById("kuchBhi")?.scrollIntoView();
  }, []);
  useEffect(() => {
    document.getElementById("kuchBhi")?.scrollIntoView();
  }, []);

  if (ExpiryValue && searchValue)
    return (
      <>
        {IndexOfCont > -1 && (
          <>
            <TableContainer
              sx={{
                height: "80vh",
              }}
              component={Paper}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        textAlign: "start",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                      colSpan={8}
                    >
                      CALLS
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="right"
                      style={{
                        textAlign: "center",
                        borderBottomWidth: 0,
                      }}
                    >
                      <Chip
                        label={
                          "Spot Price: ₹" +
                          (cont[IndexOfCont]?.market_data?.at(-1)?.ltp / 100 ||
                            "--")
                        }
                        variant="outlined"
                        sx={{
                          fontSize: "1rem",
                        }}
                        size="medium"
                      />
                    </TableCell>

                    <TableCell
                      colSpan={4}
                      style={{
                        textAlign: "center",
                        borderBottomWidth: 0,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          borderRadius: "4px",
                        }}
                      >
                        <Chip
                          label={
                            "Future Price: ₹ " +
                            (cont[IndexOfCont]?.futures[0]?.market_data?.at(-1)
                              ?.ltp / 100 || "--")
                          }
                          variant="outlined"
                          sx={{
                            fontSize: "1rem",
                          }}
                          size="medium"
                        />
                      </Typography>
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "end",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                      colSpan={8}
                    >
                      PUTS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>
                        More
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>Rho</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>
                        Vega
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>
                        Theeta
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>
                        Gamma
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>
                        Delta
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>IV</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>Vol</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>OI</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>LTP</Typography>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        backgroundColor: "#F5F5DC",
                        borderBottomWidth: 0,
                      }}
                      onClick={() => {
                        document
                          .getElementById("kuchBhi")
                          ?.scrollIntoView({ block: "center" });
                      }}
                    >
                      <Typography sx={tableCellTypographyStyle}>
                        Strike
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>LTP</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>OI</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>Vol</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography sx={tableCellTypographyStyle}>IV</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        Delta
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        Gamma
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        Theeta
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        Vega
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        Rho
                      </Typography>
                    </TableCell>
                    {/* <TableCell style={{ textAlign: "center" }}>Timestamp</TableCell> */}
                    <TableCell style={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          color: "#24242A",
                        }}
                      >
                        More
                      </Typography>
                    </TableCell>
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
                                    backgroundColor: "#1a1e4a",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "whitesmoke",
                                    }}
                                    variant="h6"
                                  >
                                    Spot Price: ₹
                                    {cont[IndexOfCont]?.market_data?.at(-1)
                                      ?.ltp / 100}{" "}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        }
                        var call_element: MarketData | undefined =
                          optionData.call.at(-1);
                        var put_element: MarketData | undefined =
                          optionData.put.at(-1);

                        if (
                          ExpiryValue === "" ||
                          (ExpiryValue && optionData.id.includes(ExpiryValue))
                        ) {
                          return (
                            <TableRow key={optionData.id}>
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.ltp > 0 ? (
                                  <a href={"/options/" + optionData.id + "CE"}>
                                    <LaunchIcon fontSize="small" />
                                  </a>
                                ) : (
                                  <LaunchIcon
                                    style={{ color: "lightgrey" }}
                                    fontSize="small"
                                  />
                                )}
                              </TableCell>

                              {/* Rho */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.rho
                                  ? roundDecimals(
                                    call_element?.inferred_data?.rho,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Vega */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.rho
                                  ? roundDecimals(
                                    call_element?.inferred_data?.rho,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Theeta */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.theta
                                  ? roundDecimals(
                                    call_element?.inferred_data?.theta,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Gamma */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.gamma
                                  ? roundDecimals(
                                    call_element?.inferred_data?.gamma,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Delta */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.delta
                                  ? roundDecimals(
                                    call_element?.inferred_data?.delta,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element?.inferred_data?.implied_volatility
                                  ? roundDecimals(
                                    call_element?.inferred_data
                                      ?.implied_volatility
                                  ).toString() + "%"
                                  : "--"}
                              </TableCell>

                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {call_element ? call_element.vol : "--"}
                              </TableCell>

                              {/* OI */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                <Typography>
                                  {" "}
                                  {call_element
                                    ?
                                    roundDecimals(
                                      call_element.oi
                                    ).toString()
                                    : "--"}
                                </Typography>

                                <Typography
                                  variant="p"
                                  style={{
                                    color:
                                      call_element?.oi &&
                                        call_element?.prev_oi
                                        ? call_element.oi -
                                          call_element.prev_oi >=
                                          0
                                          ? "green"
                                          : "#ff0000"
                                        : "black",
                                  }}
                                >
                                  {call_element && call_element.prev_oi
                                    ? roundDecimals(
                                      call_element.oi -
                                      call_element.prev_oi
                                    ).toString() +
                                    "(" +
                                    roundDecimals(
                                      ((call_element.oi -
                                        call_element.prev_oi) *
                                        100) /
                                      call_element.prev_oi
                                    ).toString() +
                                    "%)"
                                    : "--"}
                                </Typography>
                              </TableCell>

                              {/* LTP */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike <
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                <Typography>
                                  {" "}
                                  {call_element
                                    ? "₹" +
                                    roundDecimals(
                                      call_element.ltp / 100
                                    ).toString()
                                    : "--"}
                                </Typography>

                                <Typography
                                  variant="p"
                                  style={{
                                    color:
                                      call_element?.ltp &&
                                        call_element?.prev_close_price
                                        ? call_element.ltp -
                                          call_element.prev_close_price >=
                                          0
                                          ? "green"
                                          : "red"
                                        : "black",
                                  }}
                                >
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
                                    : "--"}
                                </Typography>
                              </TableCell>

                              {/* ######################################################################################################## */}
                              {/* ######################################################################################################## */}
                              {/* ######################################################################################################## */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  backgroundColor: "#F5F5DC",
                                  borderBottomWidth: 0,
                                }}
                              >
                                {optionData.strike}
                              </TableCell>
                              {/* ######################################################################################################## */}
                              {/* ######################################################################################################## */}
                              {/* ######################################################################################################## */}

                              {/* LTP */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                <Typography>
                                  {" "}
                                  {put_element
                                    ? "₹" +
                                    roundDecimals(
                                      put_element.ltp / 100
                                    ).toString()
                                    : "--"}
                                </Typography>

                                <Typography
                                  variant="p"
                                  style={{
                                    color:
                                      put_element?.ltp &&
                                        put_element?.prev_close_price
                                        ? put_element.ltp -
                                          put_element.prev_close_price >=
                                          0
                                          ? "green"
                                          : "red"
                                        : "black",
                                  }}
                                >
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

                              {/* OI */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                <Typography>
                                  {" "}
                                  {put_element
                                    ?
                                    roundDecimals(
                                      put_element.oi
                                    ).toString()
                                    : "--"}
                                </Typography>

                                <Typography
                                  variant="p"
                                  style={{
                                    color:
                                      put_element?.oi &&
                                        put_element?.prev_oi
                                        ? put_element.oi -
                                          put_element.prev_oi >=
                                          0
                                          ? "green"
                                          : "red"
                                        : "black",
                                  }}
                                >
                                  {put_element && put_element.prev_oi
                                    ? roundDecimals(
                                      put_element.oi -
                                      put_element.prev_oi
                                    ).toString() +
                                    "(" +
                                    roundDecimals(
                                      ((put_element.oi -
                                        put_element.prev_oi) *
                                        100) /
                                      put_element.prev_oi
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
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
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
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.implied_volatility
                                  ? roundDecimals(
                                    put_element?.inferred_data
                                      ?.implied_volatility
                                  ).toString() + "%"
                                  : "--"}
                              </TableCell>

                              {/* <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "#d9ecfc": "transparent", }}>Ask</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "#d9ecfc": "transparent", }}>Ask Qty</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "#d9ecfc": "transparent", }}>Bid</TableCell>
                        <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "#d9ecfc": "transparent", }}>Bid Qty</TableCell> */}

                              {/* Delta */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.delta
                                  ? roundDecimals(
                                    put_element?.inferred_data?.delta,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Gamma */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.gamma
                                  ? roundDecimals(
                                    put_element?.inferred_data?.gamma,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Theeta */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.theta
                                  ? roundDecimals(
                                    put_element?.inferred_data?.theta,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Vega */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.rho
                                  ? roundDecimals(
                                    put_element?.inferred_data?.rho,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* Rho */}
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.inferred_data?.rho
                                  ? roundDecimals(
                                    put_element?.inferred_data?.rho,
                                    3
                                  )
                                  : "--"}
                              </TableCell>

                              {/* <TableCell style={{ textAlign: "center", borderBottomWidth: 0,backgroundColor:optionData.strike >cont[IndexOfCont].market_data.at(-1)?.ltp / 100? "#d9ecfc": "transparent", }}>Timestamp</TableCell> */}

                              <TableCell
                                style={{
                                  textAlign: "center",
                                  borderBottomWidth: 0,
                                  backgroundColor:
                                    optionData.strike >
                                      cont[IndexOfCont].market_data.at(-1)?.ltp /
                                      100
                                      ? "#d9ecfc"
                                      : "transparent",
                                }}
                              >
                                {put_element?.ltp > 0 ? (
                                  <a href={"/options/" + optionData.id + "PE"}>
                                    <LaunchIcon fontSize="small" />
                                  </a>
                                ) : (
                                  <LaunchIcon
                                    style={{ color: "lightgrey" }}
                                    fontSize="small"
                                  />
                                )}
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
        )}
      </>
    );
  return <></>;
};

export default OptionTable;
