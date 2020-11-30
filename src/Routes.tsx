import React from "react";
import PokedexPage from "pages/PokedexPage";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route path="/" component={PokedexPage} />
  </Switch>
);

export default Routes;
