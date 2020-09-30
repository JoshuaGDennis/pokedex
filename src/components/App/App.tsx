import React, { useState } from "react";
import Button from "components/Button";
import { HomePage, PokedexPage } from "pages";
import { ThemeProvider } from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { THEME_LIGHT, THEME_DARK, GlobalStyles } from "theme";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const queryCache = new QueryCache();

const App: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={useDarkTheme ? THEME_DARK : THEME_LIGHT}>
        <GlobalStyles />
        <Container fluid>
          <Row>
            <Col>
              <Button onClick={() => setUseDarkTheme((s) => !s)}>
                {useDarkTheme ? "Light" : "Dark"} theme
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Router>
                <Switch>
                  <Route path="/pokedex/:id" component={PokedexPage} />
                  <Route path="/" component={HomePage} />
                </Switch>
              </Router>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
