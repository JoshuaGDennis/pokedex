import React from "react";
import { useQuery } from "react-query";
import PokemonPage from "./PokemonPage";
import { PokemonResource } from "helpers/types";
import { getPokemonResource } from "helpers/api";
import { useParams, useLocation } from "react-router-dom";

const PokemonPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<PokemonResource>();
  const { isLoading, data } = useQuery(id, getPokemonResource, {
    enabled: !location.state,
  });

  console.log(location);

  if (!location.state && (isLoading || !data)) {
    return <h2>Loading...</h2>;
  }

  if (data) {
    return <PokemonPage name={data.name} />;
  }

  return <PokemonPage name={location.state.name} />;
};

export default PokemonPageContainer;
