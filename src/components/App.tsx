import React from "react";
import Routes from "components/Routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "helpers/ThemeContext";

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
