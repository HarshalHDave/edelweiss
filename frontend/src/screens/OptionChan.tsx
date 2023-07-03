// @ts-nocheck

import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  Stack,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const options = ["ALLBANKS", "FINANCIALS", "MAINIDX", "MIDCAP"];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OptionChain() {
  const [value, setValue] = useState(0);
  const [expiry, setExpiry] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const navigate = useNavigate();

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    setExpiry(formatDate(newValue));
  };

  const formatDate = (date: Dayjs | null): string | null => {
    if (!date) return null;
    const formattedDate = date.format("DDMMMYY").toUpperCase();
    console.log(formattedDate);
    return formattedDate;
  };

  useEffect(() => {
    if (value === 0) {
      navigate("opt_table");
    } else {
      navigate("io_chart");
    }
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">OPTION CHAIN</Typography>
      <Stack
        style={{
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 2,
        }}
        direction="row"
      >
        <Autocomplete
          sx={{ width: "24%" }}
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={selectedDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          my: 2,
          justifySelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Tab
          label="Option Chain"
          {...a11yProps(0)}
          style={{ minWidth: "40%", marginLeft: "5%", marginRight: "10%" }}
        />
        <Tab label="OI Charts" {...a11yProps(1)} style={{ minWidth: "40%" }} />
      </Tabs>
      <Outlet
        context={{
          search_context: [searchValue, setSearchValue],
          expiry_context: [expiry, setExpiry],
        }}
      />
    </Box>
  );
}
