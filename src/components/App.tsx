import Routes from "./Routes";
import * as React from "react";
import * as Context from 'context'
import { BrowserRouter } from "react-router-dom";

const { GenProvider, ThemeProvider } = Context

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
