import * as React from "react";
import { PokedexPage, PokemonPage } from "pages";
import { Route, Switch } from "react-router-dom";

const Routes = () => (
  <Switch>
    <Route path="/pokemon/:id" component={PokemonPage} />
    <Route path="/" component={PokedexPage} />
  </Switch>
);

export default Routes;
