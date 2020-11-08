import "./App.scss";
import React from "react";
import { HomePage } from "pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default App;
