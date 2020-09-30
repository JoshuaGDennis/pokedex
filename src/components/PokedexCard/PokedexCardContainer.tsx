import { getPokemonResource } from "helpers/api";
import { captialise } from "helpers/strings";
import React from "react";
import { useQuery } from "react-query";
import PokedexCard from "./PokedexCard";

interface iProps {
  name: string;
}

const PokedexCardContainer: React.FC<iProps> = ({ name }: iProps) => {
  const { isLoading, data } = useQuery(name, getPokemonResource);

  if (isLoading || !data) return null;

  return (
    <PokedexCard
      name={captialise(name)}
      id={data.id}
      types={data.types.map(({ type }) => captialise(type.name))}
      img={data.sprites.front_default}
    />
  );
};

export default PokedexCardContainer;
