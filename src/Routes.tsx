import React from "react";
import PokemonPage from "pages/PokemonPage";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route path="/" component={PokemonPage} />
  </Switch>
);

export default Routes;
