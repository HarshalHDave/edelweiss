import React from "react";
import logo from "./logo.svg";
import Home from "./screens/Home";
import { SpotStocksProvider } from "./lib/spot_stocks";
import { StocksProvider } from "./lib/stocks";

function App() {
  return (
    <div className="App">
      <StocksProvider>
        <SpotStocksProvider>
          <Home />
        </SpotStocksProvider>
      </StocksProvider>
    </div>
  );
}

export default App;
