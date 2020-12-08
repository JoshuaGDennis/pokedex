import React from "react";
import Routes from "./Routes";
import { GenProvider } from "helpers/ApiContext"
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "helpers/ThemeContext";

const App: React.FC = () => (
  <ThemeProvider>
    <GenProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GenProvider>
  </ThemeProvider>
);

export default App;
