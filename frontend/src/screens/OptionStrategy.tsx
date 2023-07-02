import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Autocomplete,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormControlLabel,
    Radio,
    RadioGroup,
    Tooltip,
} from "@mui/material";

const options = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAPS"];

interface Strategy {
    symbol: string;
    expiry: string;
    quantity: string;
    optionType: string;
    side: string;
}

const OptionStrategy: React.FC = () => {
    const [symbol, setSymbol] = useState<string | null>(null);
    const [quantity, setQuantity] = useState("");
    const [strategyData, setStrategyData] = useState<Strategy[]>([]);
    const [searchValue, setSearchValue] = useState<string | null>(null);
    const [expiry, setExpiry] = useState("");
    const [optionType, setOptionType] = useState("");
    const [side, setSide] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const strategy: Strategy = {
            symbol: searchValue || "",
            expiry,
            quantity,
            optionType,
            side,
        };

        setStrategyData([...strategyData, strategy]);
        setSearchValue(null);
        setExpiry("");
        setQuantity("");
        setOptionType("");
        setSide("");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            <Box
                sx={{
                    maxWidth: 800,
                    width: "100%",
                    margin: "0 auto",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, color: "#1c3f5f" }}>
                    Option Strategy Builder
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "grid", gap: 3, maxWidth: 400, margin: "0 auto" }}
                >
                    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "1fr 1fr" }}>
                        <Autocomplete
                            id="search-input"
                            options={options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Stock/Index"
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                />
                            )}
                            value={searchValue}
                            onChange={(event, newValue) => setSearchValue(newValue)}
                        />
                        <Tooltip
                            title="Make sure you enter a quantity with a multiple of 1000"
                            placement="right"
                        >
                            <TextField
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{ width: "100%" }}
                            />
                        </Tooltip>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="expirydate">Expiry</InputLabel>
                            <Select
                                labelId="expiryDate"
                                id="expiryDate"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                displayEmpty
                                inputProps={{ "aria-label": "Expiry" }}
                                variant="outlined"
                                sx={{ width: "100%" }}
                            >
                                <MenuItem value={"2023-07-31"}>06 Jul, 2023</MenuItem>
                                <MenuItem value={"2023-08-31"}>13 Jul, 2023</MenuItem>
                                <MenuItem value={"2023-08-31"}>20 Jul, 2023</MenuItem>
                                <MenuItem value={"2023-08-31"}>27 Jul, 2023</MenuItem>
                                <MenuItem value={"2023-08-31"}>31 Aug, 2023</MenuItem>
                                <MenuItem value={"2023-08-31"}>28 Sept, 2023</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Segment</InputLabel>
                            <Select
                                value={optionType}
                                onChange={(e) => setOptionType(e.target.value as string)}
                                variant="outlined"
                                sx={{ width: "100%" }}
                            >
                                <MenuItem value="Futures">Futures</MenuItem>
                                <MenuItem value="Options">Options</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginTop: "1rem",
                        }}
                    >
                        <RadioGroup
                            value={side}
                            onChange={(e) => setSide(e.target.value)}
                            row
                        >
                            <FormControlLabel
                                value="Buy"
                                control={<Radio />}
                                label="Buy"
                                sx={{ marginRight: 2, color: "#1c3f5f" }}
                            />
                            <FormControlLabel
                                value="Sell"
                                control={<Radio />}
                                label="Sell"
                                sx={{ color: "#1c3f5f" }}
                            />
                        </RadioGroup>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ color: "#ffffff", bgcolor: "#1c3f5f" }}
                        >
                            Add Strategy
                        </Button>
                    </Box>
                </Box>

                <TableContainer sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#1c3f5f" }}>Symbol</TableCell>
                                <TableCell sx={{ color: "#1c3f5f" }}>Expiry</TableCell>
                                <TableCell sx={{ color: "#1c3f5f" }}>Quantity</TableCell>
                                <TableCell sx={{ color: "#1c3f5f" }}>Option Type</TableCell>
                                <TableCell sx={{ color: "#1c3f5f" }}>Side</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {strategyData.map((strategy, index) => (
                                <TableRow key={index}>
                                    <TableCell>{strategy.symbol}</TableCell>
                                    <TableCell>{strategy.expiry}</TableCell>
                                    <TableCell>{strategy.quantity}</TableCell>
                                    <TableCell>{strategy.optionType}</TableCell>
                                    <TableCell>{strategy.side}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default OptionStrategy;
