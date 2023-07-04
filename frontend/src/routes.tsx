import { createBrowserRouter } from "react-router-dom";
import OptionTable from "./components/OptionTable";
import OptionChain from "./screens/OptionChan";
import OptionStrategy from "./screens/OptionStrategy";
import IOCharts from "./components/IOCharts/IOCharts";
import Stocks from "./screens/Stocks/Stocks";
import StockDetails from "./screens/Stocks/StockDetails";
import Calculator from "./components/Calculator";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <OptionChain />,
		children: [
			{
				path: "/opt_table",
				element: <OptionTable />,
			},
			{
				path: "/io_chart",
				element: <IOCharts />,
			},
		],
	},
	{
		path: "/stocks",
		element: <Stocks />,
	},
	{
		path: "/option-strategy",
		element: <OptionStrategy />,
	},
	{
		path: "/options/:symbol",
		element: <StockDetails />,
	},
	{
		path: "/calculator",
		element: <Calculator />,
	},
]);
