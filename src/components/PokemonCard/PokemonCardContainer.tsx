import { getAbilityData, getPokemonSpecies, getTypeData } from "helpers/api";
import {
  PokemonAbilityResource,
  PokemonResource,
  PokemonSpeciesResource,
  PokemonTypeResource,
} from "helpers/types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { capitalise, getIdFromUrl } from "helpers/strings";
import { pokemonTypes } from "theme";
import { Ability, TypePill, Weakness } from "./PokemonCard.styles";
import PokemonCard from "./PokemonCard";
import Stats from "./components/Stats";
import { getEnglishEntry } from "helpers/funcs";

interface iProps {
  id: string;
  data: PokemonResource;
}

const PokemonCardContainer: React.FC<iProps> = ({ id, data }) => {
  const [typeData, setTypeData] = useState<PokemonTypeResource[]>([]);
  const [abilityData, setAbilityData] = useState<PokemonAbilityResource[]>([]);
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesResource | null>(
    null
  );

  const buildQueryArgs = (key: string, items: any[], itemsKey: string) => {
    return [
      key,
      { ids: items.map((item) => getIdFromUrl(item[itemsKey].url)) },
    ];
  };

  // Ability data
  useQuery(
    buildQueryArgs("abilities", data.abilities, "ability"),
    getAbilityData,
    {
      onSuccess: setAbilityData,
    }
  );

  // Species data
  useQuery(data.species.name, getPokemonSpecies, { onSuccess: setSpeciesData });

  // Type data
  useQuery(buildQueryArgs("types", data.types, "type"), getTypeData, {
    onSuccess: setTypeData,
  });

  const renderTypes = () =>
    data.types.map(({ type }) => (
      <TypePill key={type.name} color={pokemonTypes[type.name].secondary}>
        {capitalise(type.name)}
      </TypePill>
    ));

  const renderAbilities = () =>
    abilityData.map(({ name, flavor_text_entries }) => (
      <Ability key={name}>
        <h3>{capitalise(name)}</h3>
        <p>{getEnglishEntry(flavor_text_entries)}</p>
      </Ability>
    ));

  const renderDamages = () => {
    const damages = new Set<string>();

    typeData.forEach((type) =>
      type.damage_relations.double_damage_from.forEach((item) =>
        damages.add(item.name)
      )
    );

    return [...damages].map((item) => (
      <Weakness colors={pokemonTypes[item]}>{capitalise(item)}</Weakness>
    ));
  };

  const renderStats = () => (
    <Stats
      stats={data.stats}
      colors={{ ...pokemonTypes[data.types[0].type.name] }}
    />
  );

  if (typeData.length < 1 || abilityData.length < 1 || !speciesData) {
    return <h2>Loading</h2>;
  }

  return (
    <PokemonCard
      id={id}
      image={data.sprites.front_default}
      name={capitalise(data.name)}
      description={getEnglishEntry(speciesData.flavor_text_entries)}
      renderTypes={renderTypes}
      renderAbilities={renderAbilities}
      renderDamages={renderDamages}
      renderStats={renderStats}
    />
  );
};

export default PokemonCardContainer;
