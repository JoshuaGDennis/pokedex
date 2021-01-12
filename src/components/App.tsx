import Routes from "./Routes";
import * as React from "react";
import ThemeToggle from "./ThemeToggle";
import { BrowserRouter } from "react-router-dom";
import { GenerationProvider } from 'context/GenerationContext'

const App: React.FC = () => (
  <GenerationProvider>
    <ThemeToggle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </GenerationProvider>
);

export default App;
