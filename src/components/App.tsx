import Routes from "./Routes";
import * as React from "react";
import * as Context from "context";
import ThemeToggle from "./ThemeToggle";
import { BrowserRouter } from "react-router-dom";
import { GenerationProvider } from 'context/GenerationContext'

const { GenProvider } = Context;

const App: React.FC = () => (
  <GenProvider>
    <GenerationProvider>
      <ThemeToggle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GenerationProvider>
  </GenProvider>
);

export default App;
