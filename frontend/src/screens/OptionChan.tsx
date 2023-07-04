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

const options = ["ALLBANKS", "FINANCIALS", "MAINIDX", "MIDCAP"];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OptionChain() {
  const companies = useContext(ctx);

  const [value, setValue] = React.useState(0);
  const [expiry, setExpiry] = React.useState("");
  const [searchValue, setSearchValue] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const [enabledDates, setEnabledDates] = React.useState<Dayjs[]>([
    //   dayjs("2023-07-05"),
    //   dayjs("2023-07-06"),
    //   dayjs("2023-07-07"),
    //   dayjs("2023-07-08"),
  ]);

  const [date, setDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (!companies) return;
    if (!searchValue) return;

    const company = companies.find((c) => c.name == searchValue);
    if (!company) return;
    const enabledDates = company.options.map((o) => dayjs(o.expiry_date));
    setEnabledDates(enabledDates);
  }, [companies, searchValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const today = new Date(); // Get current date
    const availableDates = [
      "06JUL23",
      "13JUL23",
      "20JUL23",
      "27JUL23",
      "31AUG23",
      "28SEP23",
    ]; // Dates available in the menu

    // Find the nearest date from today's date
    const nearestDate = availableDates.reduce((prevDate, currentDate) => {
      const prevDateTime = new Date(prevDate).getTime();
      const currentDateTime = new Date(currentDate).getTime();
      const todayDateTime = today.getTime();
      return Math.abs(currentDateTime - todayDateTime) <
        Math.abs(prevDateTime - todayDateTime)
        ? currentDate
        : prevDate;
    });

    setExpiry(nearestDate); // Set the nearest date as the default value
  }, []);

  useEffect(() => {
    if (value === 0) {
      navigate("opt_table");
    } else {
      navigate("io_chart");
    }
  }, [value]);

  function isDateEnabled(date: Dayjs) {
    return enabledDates.some((enabledDate) => date.isSame(enabledDate, "day"));
  }

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