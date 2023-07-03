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
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const options = ["ALLBANKS", "FINANCIALS", "MAINIDX", "MIDCAP"];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OptionChain() {
  const [value, setValue] = React.useState(0);
  const [expiry, setExpiry] = React.useState("");
  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(convertDate(date));
  };

  const convertDate = (date: Date | null): string | null => {
    if (!date) return null;
    const formattedDate = dayjs(date).format("DDMMMYY").toUpperCase();
    console.log("the formatted date is", formattedDate);
    return formattedDate;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h4">OPTION CHAIN</Typography>
        <hr />
        <Stack
          className="miniForm"
          direction="row"
          sx={{
            justifyContent: "space-evenly",
            marginTop: 10,
            marginBottom: 1,
          }}
        >
          <Autocomplete
            sx={{ width: 300 }}
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

          {/* <FormControl>
            <InputLabel id="expirydate"> Expiry</InputLabel>
            <Select
              labelId="expiryDate"
              id="expiryDate"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value as string)}
              displayEmpty
              inputProps={{ "aria-label": "Expiry" }}
            >
              <MenuItem value={"06JUL23"}>06 Jul, 2023</MenuItem>
              <MenuItem value={"13JUL23"}>13 Jul, 2023</MenuItem>
              <MenuItem value={"20JUL23"}>20 Jul, 2023</MenuItem>
              <MenuItem value={"27JUL23"}>27 Jul, 2023</MenuItem>
              <MenuItem value={"31AUG23"}>31 Aug, 2023</MenuItem>
              <MenuItem value={"28SEP23"}>28 Sept, 2023</MenuItem>
            </Select>
          </FormControl> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>
        </Stack>
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
