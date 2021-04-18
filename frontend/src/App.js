import Login from "./components/Login/Login";
import StockBoard from "./components/stock/StockBoard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import {
  CssBaseline,
  createMuiTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Switch>
            {localStorage.getItem("accessToken") ? (
              <Route path="/">
                <StockBoard />
              </Route>
            ) : (
              <Route exact path="/">
                <Login />
              </Route>
            )}
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
