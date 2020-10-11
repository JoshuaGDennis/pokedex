import {
  getAbilityData,
  getPokemonResource,
  getPokemonSpecies,
  getTypeData,
} from "helpers/api";
import {
  PokemonAbilityResource,
  PokemonResource,
  PokemonSpeciesResource,
  PokemonTypeResource,
} from "helpers/types";
import { pokemonTypes } from "theme";
import { useQuery } from "react-query";
import PokemonPage from "./PokemonPage";
import { getEnglishEntry } from "helpers/funcs";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { capitalise, getIdFromUrl, getShortStat } from "helpers/strings";

const PokemonPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation<PokemonResource>();

  const [pokemonData, setData] = useState<PokemonResource | null>(null);
  const [typeData, setTypeData] = useState<PokemonTypeResource[]>([]);
  const [abilities, setAbilities] = useState<PokemonAbilityResource[]>([]);
  const [species, setSpecies] = useState<PokemonSpeciesResource | null>(null);

  const buildAbilityDescription = (ability: PokemonAbilityResource) => {
    const effect = ability.effect_entries.find(
      (entry) => entry.language.name === "en"
    );

    const flavorText = ability.flavor_text_entries.find(
      (text) => text.language.name === "en"
    );

    return `${effect ? effect.effect : ""} ${
      flavorText ? flavorText.flavor_text : ""
    }`;
  };

  const buildWeaknesses = (): string[] => {
    const weaknesses: string[] = [];

    typeData.forEach(({ damage_relations }) =>
      damage_relations.double_damage_from.forEach(({ name }) =>
        weaknesses.push(capitalise(name))
      )
    );

    return [...new Set(weaknesses)];
  };

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

  // Weaknesses data
  useQuery(
    [
      "types",
      {
        ids: pokemonData?.types.map(({ type }) => getIdFromUrl(type.url)),
      },
    ],
    getTypeData,
    {
      enabled: pokemonData && pokemonData.types,
      onSuccess: (data) => setTypeData(data),
    }
  );

  if (!pokemonData || !species || !abilities || !typeData) {
    return <h2>Loading...</h2>;
  }

  return (
    <PokemonPage
      id={id}
      abilities={abilities.map((ability) => ({
        name: capitalise(ability.name),
        description: buildAbilityDescription(ability),
      }))}
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
      weaknesses={buildWeaknesses()}
    />
  );
};

export default PokemonPageContainer;
