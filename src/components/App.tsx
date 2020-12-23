import Routes from "./Routes";
import * as React from "react";
import * as Context from "context";
import ThemeToggle from "./ThemeToggle";
import { BrowserRouter } from "react-router-dom";

const { GenProvider } = Context;

const App: React.FC = () => (
  <GenProvider>
    <ThemeToggle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </GenProvider>
);

export default App;
