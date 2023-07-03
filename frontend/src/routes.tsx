import { createBrowserRouter } from "react-router-dom";
import OptionTable from "./components/OptionTable";
import OptionChain from "./screens/OptionChan";
import OptionStrategy from "./screens/OptionStrategy";
import IOCharts from "./components/IOCharts/IOCharts";

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
    path: "/option-strategy",
    element: <OptionStrategy />,
  },
]);
