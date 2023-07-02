import { createBrowserRouter } from "react-router-dom";
import OptionTable from "./components/OptionTable";
import OptionChain from "./screens/OptionChan";

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
        element: <></>,
      },
    ],
  },
]);
