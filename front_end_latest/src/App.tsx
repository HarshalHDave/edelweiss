import React from "react";
import logo from "./logo.svg";
import OptionTable from "./components/OptionTable";
import OptionChain from "./screens/OptionChan";
import { SpotStocksProvider } from "./lib/spot_stocks";
import { StocksProvider } from "./lib/stocks";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="App">
      <StocksProvider>
        <SpotStocksProvider>
          <RouterProvider  router={router}/>
        </SpotStocksProvider>
      </StocksProvider>
    </div>
  );
}

export default App;
