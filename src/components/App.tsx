import Routes from "./Routes";
import * as React from "react";
import * as helpers from 'helpers'
import { BrowserRouter } from "react-router-dom";

const { GenProvider, ThemeProvider } = helpers

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
