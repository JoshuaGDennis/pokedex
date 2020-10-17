import { useQuery } from "react-query";
import PokemonPage from "./PokemonPage";
import { PokemonResource } from "helpers/types";
import { getPokemonResource } from "helpers/api";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const PokemonPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation<PokemonResource>();
  const [pokemonData, setData] = useState<PokemonResource | null>(null);

  useEffect(() => {
    if (!pokemonData && location.state) {
      setData(location.state);
    }
  }, [pokemonData, location.state]);

  // Pokemon data
  useQuery(id, getPokemonResource, {
    enabled: !location.state,
    onSuccess: (data) => setData(data),
  });

  if (!pokemonData) {
    return <h2>Loading...</h2>;
  }

  return <PokemonPage id={id} data={pokemonData} />;
};

export default PokemonPageContainer;
