import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	Typography,
	Stack,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	IconButton,
	Box,
	Divider,
	CircularProgress,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import ctx from "../../lib/Context";

interface Candle {
	x: number;
	y: number[];
}

function splitDataIntoCandles(data: MarketData[]) {
	const candles = [];
	let currentCandle = null;

	for (let i = 0; i < data.length; i++) {
		const { ltp } = data[i];
		const timestamp = data[i].timestamp as number;

		if (!currentCandle) {
			currentCandle = {
				open: ltp,
				close: ltp,
				high: ltp,
				low: ltp,
				timestamp: timestamp as number,
			};
		} else if (timestamp - currentCandle.timestamp >= 150000) {
			// 300000 ms = 5 minutes
			candles.push({
				x: currentCandle.timestamp,
				y: [
					currentCandle.open,
					currentCandle.high,
					currentCandle.low,
					currentCandle.close,
				],
			});
			currentCandle = {
				open: ltp,
				close: ltp,
				high: ltp,
				low: ltp,
				timestamp: timestamp,
			};
		} else {
			currentCandle.close = ltp;
			currentCandle.high = Math.max(currentCandle.high, ltp);
			currentCandle.low = Math.min(currentCandle.low, ltp);
		}
	}

	if (currentCandle) {
		candles.push({
			x: currentCandle.timestamp,
			y: [
				currentCandle.open,
				currentCandle.high,
				currentCandle.low,
				currentCandle.close,
			],
		});
	}
	return candles;
}

interface OptionDisplay {
	id: string;
	strike: number;
	type: "cal" | "put";
}

const StockDetails = () => {
	const context = useContext(ctx);

	// const { companyIndex, type, index } = useParams();
	const { symbol } = useParams();

	// const _companyIndex = companyIndex ? parseInt(companyIndex) : undefined;
	// const _index = index ? parseInt(index) : undefined;

	const [ChartData, setChartData] = useState<Candle[]>([]);
	const [marketData, setMarketData] = useState<MarketData[] | undefined>(
		undefined
	);

	const [type, setType] = useState<string>("c");
	const [company, setCompany] = useState<Company | null>(null);
	const [option, setOption] = useState<Option | Future | null>(null);
	const [calls, setCalls] = useState<OptionDisplay[] | null>(null);
	const [puts, setPuts] = useState<OptionDisplay[] | null>(null);

	useEffect(() => {
		if (
			symbol &&
			context
			// _companyIndex !== undefined &&
			// type &&
			// _index !== undefined &&
		) {
			const id = symbol.slice(0, -2);
			const _type = symbol.slice(-2);
			if (_type == "CE") setType("c");
			else if (_type == "PE") setType("p");
			else setType("f");

			for (let i = 0; i < context.length; i++) {
				let _company = context[i];
				if (_type == "XX") {
					const maybe =
						_company.futures.find((f) => f.id === id) ?? null;
					if (maybe) {
						setOption(maybe);
						setMarketData(maybe.market_data);
						setCompany(_company);
						break;
					}
				} else {
					const maybe =
						_company.options.find((o) => o.id === id) ?? null;
					if (maybe) {
						setOption(maybe);
						if (_type == "CE") setMarketData(maybe.call);
						else setMarketData(maybe.put);
						setCompany(_company);
						break;
					}
				}
			}
		}
	}, [symbol, context]);

	useEffect(() => {
		if (company && option && type) {
			if (type != "f") {
				setCalls(
					company.options
						.filter((o) => o.call.length > 0)
						.map((o) => ({
							id: o.id,
							strike: o.strike,
							type: "cal",
						}))
				);
				setPuts(
					company.options
						.filter((o) => o.put.length > 0)
						.map((o) => ({
							id: o.id,
							strike: o.strike,
							type: "cal",
						}))
				);
			}
		}
		// }, [_companyIndex, type, _index, context]);
	}, [company, option, type]);

	useEffect(() => {
		if (marketData) setChartData(splitDataIntoCandles(marketData));
	}, [marketData]);

	function getRiskOptions(
		spot_price: number,
		strike_price: number,
		type: "cal" | "put",
		risk: "high" | "low" | "hedge",
		puts: OptionDisplay[],
		calls: OptionDisplay[]
	) {
		let direction: "up" | "down";
		if (type == "cal") direction = "down";
		if (type == "put") direction = "up";
		console.log(direction!);

		let gap = Math.abs(spot_price - strike_price);
		console.log("Gap: ", gap);

		if (risk == "low") gap *= 2 / 3;
		else if (risk == "high") gap *= 1 / 3;
		console.log("Adjusted gap: ", gap);

		let target = strike_price + (direction! == "down" ? gap : -gap);
		console.log("Target: ", target);

		puts.sort((a, b) => a.strike - b.strike);
		calls.sort((a, b) => a.strike - b.strike);

		console.log(puts);
		console.log(calls);

		let option: OptionDisplay;
		if (type == "cal") {
			for (let i = 0; i < puts.length; i++) {
				if (puts[i].strike >= target) {
					option = puts[i];
					break;
				}
			}
		} else {
			for (let i = 0; i < calls.length; i++) {
				if (calls[i].strike > target) {
					option = calls[i - 1];
					break;
				}
			}
		}

		return option!;
	}

	if (!marketData)
		return (
			<>
				<IconButton
					component={Link}
					to="/opt_table"
					style={{
						marginRight: "8px",
						backgroundColor: "#f5f5f5",
					}}
				>
					<ArrowBack />
				</IconButton>
				<Box
					sx={{
						w: "100vw",
						h: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularProgress />
				</Box>
			</>
		);

	return (
		// <div style={{ overflowX: "hidden" }}>
		<Grid container spacing={0}>
			<button
				onClick={() => {
					console.log(
						getRiskOptions(
							company!.market_data.at(-1)?.ltp! / 100,
							option!.strike,
							type == "c" ? "cal" : "put",
							"hedge",
							puts!,
							calls!
						)
					);
				}}
			>
				Do
			</button>
			<Grid item xs={12} md={3}>
				<Stack
					direction="column"
					spacing={1}
					sx={{
						"@media (max-width: 425px)": {
							marginBottom: "35px",
							justifyContent: "center",
							// alignItems: "center",
						},
					}}
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						<IconButton
							component={Link}
							to="/opt_table"
							style={{
								marginRight: "8px",
								backgroundColor: "#f5f5f5",
							}}
						>
							<ArrowBack />
						</IconButton>
						<Typography variant="h6">{option?.id}</Typography>
					</Stack>
					<Typography variant="body2">{option?.id}</Typography>
					<Divider
						sx={{
							height: "1px",
							backgroundColor: "#ccc",
							marginBottom: "10px",
							"@media (max-width: 425px)": {
								width: "63%",
							},
							"@media (max-width: 768px)": {
								width: "32%",
							},
						}}
					/>

					<Stack direction="row" alignItems="center" spacing={2}>
						<Typography>₹{marketData.at(-1)!.ltp}</Typography>
						<Typography
							sx={{ color: "#388e3c", fontWeight: "bold" }}
						>
							+53.60 (+164.17%)
						</Typography>
					</Stack>
					<Divider
						sx={{
							height: "1px",
							backgroundColor: "#ccc",
							marginBottom: "10px",
							"@media (max-width: 425px)": {
								width: "63%",
							},
							"@media (max-width: 768px)": {
								width: "32%",
							},
						}}
					/>
					<Stack direction="column" spacing={1}>
						<Typography variant="body2">
							Company Overview
						</Typography>
						<Typography variant="body2">Option Chains</Typography>
						<Link
							to="/calculator"
							style={{ textDecoration: "none" }}
						>
							<Typography variant="body2">
								Investment Calculators
							</Typography>
						</Link>
						<Typography variant="body2">FAQ's</Typography>
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12} md={9} sm={12}>
				<Typography variant="h4">{option?.id}</Typography>
				<ReactApexChart
					options={{
						chart: {
							type: "candlestick",
						},
					}}
					series={[
						{
							data: ChartData,
						},
					]}
					type="candlestick"
					height={350}
					width="100%"
				/>
				<Grid item xs={12} md={12} sm={12}>
					<TableContainer
						sx={{
							border: "1px solid #ccc",
							borderRadius: "4px",
							overflow: "hidden",
							width: "100%",
						}}
					>
						<Table>
							<TableHead>
								<TableRow sx={{ backgroundColor: "#f5f5f5" }}>
									<TableCell
										sx={{
											fontWeight: "bold",
											borderBottom: "1px solid #ccc",
										}}
									>
										{option?.id}
									</TableCell>
									<TableCell
										sx={{
											fontWeight: "bold",
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Open
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										₹ 121.00
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Close
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										₹ 100.95
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Circuit Range
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										₹ 606.80 - ₹ 0.05
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Day Range
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										₹ 121.00 - ₹ 221.35
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Volume
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										1,56,72,500.00
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Avg. Traded
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										₹ 185.03
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Spot
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										207.35
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										OI
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										8,77,950.00
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										sx={{ borderBottom: "1px solid #ccc" }}
									>
										Change in Ol
									</TableCell>
									<TableCell
										sx={{
											borderBottom: "1px solid #ccc",
											textAlign: "end",
										}}
									>
										-10,82,900.00
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Grid>
		// </div>
	);
};

export default StockDetails;
