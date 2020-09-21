import React, { useState } from "react";
import HomePage from "pages/HomePage";
import { Button } from "react-bootstrap";
import { ThemeProvider } from "styled-components";
import { THEME_LIGHT, THEME_DARK, GlobalStyles } from "theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  return (
    <ThemeProvider theme={useDarkTheme ? THEME_DARK : THEME_LIGHT}>
      <GlobalStyles />
      <Button variant="primary" onClick={() => setUseDarkTheme((s) => !s)}>
        {useDarkTheme ? "Light" : "Dark"} theme
      </Button>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
