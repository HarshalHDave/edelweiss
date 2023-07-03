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

const options = ["ALLBANKS", "FINANCIALS", "MAINIDX", "MIDCAP"];

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
    <Box sx={{ width: "100" }}>
      <Typography variant="h4">OPTION CHAIN</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        {/* <Typography textAlign={'center'} mt={2} fontSize={16}>Stock/Index</Typography> */}
        <Autocomplete
          sx={{ width: '24%' }}
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

        <FormControl
          sx={{ width: '24%' }}
        >
          <InputLabel id="expirydate"> Expiry</InputLabel>
          <Select
            labelId="expiryDate"
            id="expiryDate"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
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
        </FormControl>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          my: 2,
          justifySelf: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <Tab label="Option Chain" {...a11yProps(0)} style={{ minWidth: "40%", marginLeft: "5%", marginRight: "10%" }} />
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
