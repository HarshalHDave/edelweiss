import { StocksProvider } from "./lib/Context";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <StocksProvider>
          <RouterProvider router={router} />
        </StocksProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
