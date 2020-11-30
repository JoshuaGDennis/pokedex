import React from "react";
import PokedexPage from "pages/PokedexPage";
import { Route, Switch } from "react-router-dom";
import PokemonPage from "pages/PokemonPage";

const Routes = () => (
  <Switch>
    <Route path="/pokemon/:id" component={PokemonPage} />
    <Route path="/" component={PokedexPage} />
  </Switch>
);

export default Routes;
