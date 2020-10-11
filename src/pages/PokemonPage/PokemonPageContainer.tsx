import { useQuery } from "react-query";
import PokemonPage from "./PokemonPage";
import { capitalise, getIdFromUrl, getShortStat } from "helpers/strings";
import { getEnglishEntry } from "helpers/funcs";
import {
  PokemonAbilityResource,
  PokemonResource,
  PokemonSpeciesResource,
} from "helpers/types";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  getAbilityData,
  getPokemonResource,
  getPokemonSpecies,
} from "helpers/api";
import { pokemonTypes } from "theme";

const PokemonPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation<PokemonResource>();

  const [pokemonData, setData] = useState<PokemonResource | null>(null);
  const [species, setSpecies] = useState<PokemonSpeciesResource | null>(null);
  const [abilities, setAbilities] = useState<PokemonAbilityResource[]>([]);

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

  // Species data
  useQuery(pokemonData?.species.name, getPokemonSpecies, {
    enabled: pokemonData && pokemonData.species,
    onSuccess: (data) => setSpecies(data),
  });

  // Abilities data
  useQuery(
    [
      "abilities",
      {
        ids: pokemonData?.abilities.map(({ ability }) =>
          getIdFromUrl(ability.url)
        ),
      },
    ],
    getAbilityData,
    {
      enabled: pokemonData && pokemonData.abilities,
      onSuccess: (data) => setAbilities(data),
    }
  );

  if (!pokemonData || !species || !abilities) {
    return <h2>Loading...</h2>;
  }

  return (
    <PokemonPage
      id={id}
      name={capitalise(pokemonData.name)}
      description={getEnglishEntry(species.flavor_text_entries)}
      image={pokemonData.sprites.front_default}
      stats={pokemonData.stats.map(({ base_stat, stat }) => ({
        name: getShortStat(stat.name),
        value: base_stat,
      }))}
      types={pokemonData.types.map(({ type }) => ({
        name: capitalise(type.name),
        ...pokemonTypes[type.name],
      }))}
    />
  );
};

export default PokemonPageContainer;
