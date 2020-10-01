import { useQuery } from "react-query";
import PokemonPage from "./PokemonPage";
import { capitalise } from "helpers/strings";
import { getEnglishEntry } from "helpers/funcs";
import { PokemonResource } from "helpers/types";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPokemonResource, getPokemonSpecies } from "helpers/api";

const PokemonPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation<PokemonResource>();

  const [pokemonData, setPokemonData] = useState<PokemonResource | null>(null);

  // Pokemon Resource data
  const { isLoading, data } = useQuery(id, getPokemonResource, {
    enabled: !location.state,
  });

  // Pokemon Species data
  const { isLoading: isLoadingSpecies, data: species } = useQuery(
    pokemonData?.species.name,
    getPokemonSpecies,
    { enabled: pokemonData && pokemonData.species }
  );

  useEffect(() => {
    if (!pokemonData) {
      setPokemonData(location.state ? location.state : data ? data : null);
    }
  }, [pokemonData, data, location.state]);

  if (isLoading || isLoadingSpecies || !pokemonData || !species) {
    return <h2>Loading...</h2>;
  }

  return (
    <PokemonPage
      name={capitalise(pokemonData.name)}
      description={getEnglishEntry(species.flavor_text_entries)}
    />
  );
};

export default PokemonPageContainer;
