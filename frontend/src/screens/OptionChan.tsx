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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const options = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAPS"];

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

          <FormControl fullWidth>
            <InputLabel id="expirydate"> Expiry</InputLabel>
            <Select
              labelId="expiryDate"
              id="expiryDate"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Expiry" }}
            >
              <MenuItem value={"2023-07-31"}>06 Jul, 2023</MenuItem>
              <MenuItem value={"2023-08-31"}>13 Jul, 2023</MenuItem>
              <MenuItem value={"2023-08-31"}>20 Jul, 2023</MenuItem>
              <MenuItem value={"2023-08-31"}>27 Jul, 2023</MenuItem>
              <MenuItem value={"2023-08-31"}>31 Aug, 2023</MenuItem>
              <MenuItem value={"2023-08-31"}>28 Sept, 2023</MenuItem>
            </Select>
          </FormControl>
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
      <Outlet />
    </Box>
  );
}
