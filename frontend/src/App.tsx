import { StocksProvider } from "./lib/Context";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="App">
      <StocksProvider>
        <RouterProvider router={router} />
      </StocksProvider>
    </div>
  );
}

export default App;
