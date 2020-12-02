import React from "react";
import Routes from "./Routes";
import { ApiProvider } from "helpers/ApiContext"
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "helpers/ThemeContext";

const App: React.FC = () => (
  <ThemeProvider>
    <ApiProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApiProvider>
  </ThemeProvider>
);

export default App;
