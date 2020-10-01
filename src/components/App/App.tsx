import React, { useState } from "react";
import Button from "components/Button";
import { ThemeProvider } from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { HomePage, PokedexPage, PokemonPage } from "pages";
import { Route, Switch, useLocation } from "react-router-dom";
import { THEME_LIGHT, THEME_DARK, GlobalStyles } from "theme";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache();

const App: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);
  const location = useLocation();
  const genId = localStorage.getItem("current_gen");

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
              {location.pathname !== "/" && (
                <Button to="/">Back to menu</Button>
              )}
              {genId &&
                location.pathname !== "/" &&
                location.pathname.indexOf("pokedex") === -1 && (
                  <Button to={`/pokedex/${genId}`}>Back to pokedex</Button>
                )}
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Switch>
                <Route path="/pokemon/:id" component={PokemonPage} />
                <Route path="/pokedex/:id" component={PokedexPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
