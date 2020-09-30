import React, { useState } from "react";
import HomePage from "pages/HomePage";
import Button from "components/Button";
import { ThemeProvider } from "styled-components";
import { THEME_LIGHT, THEME_DARK, GlobalStyles } from "theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const App: React.FC = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  return (
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
                <Route path="/" component={HomePage} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
