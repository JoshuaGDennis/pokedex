import React from "react";
import { pokemonTypes } from "theme";
import { useQuery } from "react-query";
import PokedexCard from "./PokedexCard";
import { capitalise } from "helpers/strings";
import { getPokemonResource } from "helpers/api";

interface iProps {
  name: string;
}

const PokedexCardContainer: React.FC<iProps> = ({ name }: iProps) => {
  const { isLoading, data } = useQuery(name, getPokemonResource);

  if (isLoading || !data) return null;

  const types = data.types.map(({ type }) => ({
    name: capitalise(type.name),
    color: pokemonTypes[type.name].secondary,
  }));

  return (
    <PokedexCard
      name={capitalise(name)}
      id={data.id}
      types={types}
      img={data.sprites.front_default}
      pokemonColor={pokemonTypes[types[0].name.toLowerCase()].primary}
    />
  );
};

export default PokedexCardContainer;
