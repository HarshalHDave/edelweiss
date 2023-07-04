import { useContext, useEffect, useState } from "react";

// MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Components
import Legend from "./Legend";

// Context
import ctx from "../lib/Context";
import { useOutletContext } from "react-router-dom";

const OptionTable = () => {
	const companyChoices = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAP"];

	// Context
	const companies = useContext(ctx);
	const { searchValue, expiryValue } = useOutletContext<{
		searchValue: string | null;
		expiryValue: string | null;
	}>();

	// State
	const [selectedCompany, setSelectedCompany] = useState(0);

	useEffect(() => {
		if (searchValue)
			setSelectedCompany(companyChoices.indexOf(searchValue));
	}, [companyChoices, searchValue]);

	// Not ready yet
	if (companies.length === 0) return <h1>Loading</h1>;

	if (companies[selectedCompany].options.length == 0)
		return <h1>The company you selected has no options</h1>;

	const options = companies[selectedCompany].options.sort(
		(a, b) => a.strike - b.strike
	);

	let strikerIndex = -1;
	// Find position of striker
	if (companies[selectedCompany].market_data.length > 0) {
		// Company's underlying price is available
		const underlyingPrice =
			companies[selectedCompany].market_data.at(-1)!.ltp;
		for (let i = 0; i < options.length; i++) {
			if (
				options[i].strike < underlyingPrice &&
				underlyingPrice < options[i + 1].strike
			) {
				strikerIndex = i + 1;
				break;
			}
		}
	}

	return (
		<>
			<TableContainer
				sx={{
					height: "70vh",
				}}
				component={Paper}
			>
				<Table stickyHeader>
					<Header1 />
					<Header2 />
					<TableBody>
						{companies &&
							companies[selectedCompany].options &&
							companies[selectedCompany].options
								.sort((a, b) => a.strike - b.strike)
								.map((optionData, option_index, arr) => {
									if (
										optionData.strike <
											companies[
												selectedCompany
											].market_data.at(-1)?.ltp /
												100 &&
										option_index + 1 < arr.length &&
										companies[
											selectedCompany
										].market_data.at(-1)?.ltp /
											100 <
											arr[option_index + 1].strike
									) {
										return (
											<>
												<TableRow>
													<TableCell
														colSpan={11}
														style={{
															textAlign: "center",
														}}
													>
														Striker -{" "}
														{companies[
															selectedCompany
														].market_data.at(-1)
															?.ltp / 100}
													</TableCell>
												</TableRow>
											</>
										);
									}
									// for (
									//   let index = 0;
									//   index <
									//   Math.max(optionData.call.length, optionData.put.length);
									//   index++
									// ) {
									var call_element: MarketData | undefined =
										optionData.call.at(-1);
									var put_element: MarketData | undefined =
										optionData.put.at(-1);
									// if (index < optionData.call.length)
									//   call_element = optionData.call[index];
									// if (index < optionData.put.length)
									//   put_element = optionData.put[index];

									if (!call_element)
										console.log(
											"Boogy call element",
											`optionData length = ${optionData.call.length}`
										);
									if (!put_element)
										console.log(
											"Boogy put element",
											`optionData length = ${optionData.put.length}`
										);

									if (
										ExpiryValue === "" ||
										(ExpiryValue &&
											optionData.id.includes(ExpiryValue))
									) {
										// console.log(optionData);

										return (
											<TableRow>
												<TableCell>
													{optionData.id}
												</TableCell>
												<TableCell>
													{call_element
														? call_element.vol
														: ""}
												</TableCell>
												<TableCell>
													{call_element
														? call_element.vol
														: ""}
												</TableCell>
												<TableCell>
													{call_element
														? call_element.oi
														: ""}
												</TableCell>
												<TableCell>
													{call_element
														? call_element.ltp.toString() +
														  " " +
														  // new Date(
														  call_element.timestamp
														: // )
														  ""}
												</TableCell>
												<TableCell
													style={{
														textAlign: "center",
													}}
												>
													{optionData.strike}
												</TableCell>
												<TableCell>
													{put_element
														? put_element.ltp.toString() +
														  " " +
														  // new Date(
														  put_element.timestamp
														: // )
														  ""}
												</TableCell>
												<TableCell>
													{put_element
														? put_element.oi
														: ""}
												</TableCell>
												<TableCell>
													{put_element
														? put_element.vol
														: ""}
												</TableCell>
												<TableCell>
													{put_element
														? put_element.vol
														: ""}
												</TableCell>
												<TableCell>
													{optionData.id}
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
	);
};

function Header1() {
	return (
		<TableHead>
			<TableRow>
				<TableCell style={{ textAlign: "center" }} colSpan={5}>
					CALLS
				</TableCell>
				<TableCell style={{ textAlign: "center" }}>
					Strike Price
				</TableCell>
				<TableCell style={{ textAlign: "center" }} colSpan={5}>
					PUTS
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

function Header2() {
	return (
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
	);
}

export default OptionTable;
