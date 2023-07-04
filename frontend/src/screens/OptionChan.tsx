import React, { useContext, useEffect } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ctx from "../lib/Context";
import { useLocation } from "react-router-dom";

const options = ["ALLBANKS", "FINANCIALS", "MAINIDX", "MIDCAP"];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OptionChain() {
  const companies = useContext(ctx);

  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState(0);
  const [expiry, setExpiry] = React.useState("");
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  const [enabledDates, setEnabledDates] = React.useState<Dayjs[]>([
    //   dayjs("2023-07-05"),
    //   dayjs("2023-07-06"),
    //   dayjs("2023-07-07"),
    //   dayjs("2023-07-08"),
  ]);

  const [date, setDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stockUrl = queryParams.get("stockUrl");
    const expiryUrl = queryParams.get("expiryUrl");

    if (stockUrl) {
      setSearchValue(stockUrl);
    }

    if (expiryUrl) {
      setDate(dayjs(expiryUrl));
      setExpiry(expiryUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (!searchValue) return;
    if (!expiry) return;

    navigate(`?stockUrl=${searchValue}&expiryUrl=${expiry}`);
  }, [searchValue, expiry, navigate]);

  useEffect(() => {
    if (!companies) return;
    if (!searchValue) return;

    const company = companies.find((c) => c.name == searchValue);
    if (!company) return;
    const enabledDates = company.options.map((o) => dayjs(o.expiry_date));
    setEnabledDates(enabledDates);
  }, [companies, searchValue]);

  useEffect(() => {
    if (value === 0) {
      navigate("opt_table");
    } else {
      navigate("io_chart");
    }
  }, [navigate, value]);

  function isDateEnabled(date: Dayjs) {
    return enabledDates.some((enabledDate) => date.isSame(enabledDate, "day"));
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h4">OPTION CHAIN</Typography>
        <hr />
        <div
          className="miniForm"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 2,
          }}
        >
          <Autocomplete
            fullWidth
            id="search-input"
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Stock/Index"
                variant="outlined"
              />
            )}
            value={searchValue}
            onChange={(event, newValue) => setSearchValue(newValue)}
          />

          <Box
            sx={{
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiry"
                value={date}
                shouldDisableDate={(date) => !isDateEnabled(date)}
                onChange={(newValue) => {
                  setDate(newValue);

                  if (newValue === null) return;

                  const formattedDate = newValue
                    .format("DDMMMYY")
                    .toUpperCase();
                  setExpiry(formattedDate);
                }}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            my: 2,
          }}
        >
          <Tab label="Option Chain" {...a11yProps(0)} />
          <Tab label="IO Charts" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Outlet
        context={{
          search_context: [searchValue, setSearchValue],
          expiry_context: [expiry, setExpiry],
        }}
      />
    </Box>
  );
}
