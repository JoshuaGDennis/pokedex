import { useQuery } from "react-query";
import PokedexPage from "./PokedexPage";
import { KeyValue } from "helpers/types";
import { getGeneration } from "helpers/api";
import { useParams } from "react-router-dom";
import { sortListByIds } from "helpers/funcs";
import React, { useEffect, useState } from "react";

const LIST_INCREMENT = 4;

const PokedexPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery(id, getGeneration);

  const [limit, setLimit] = useState<number>(LIST_INCREMENT);
  const [pokemonList, setPokemonList] = useState<KeyValue[]>([]);

  const onLoadMoreClick = () => {
    setLimit((s) => s + LIST_INCREMENT);
  };

  useEffect(() => {
    if (data) {
      setPokemonList(sortListByIds(data.pokemon_species));
    }
  }, [data]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <PokedexPage
      pokemon={pokemonList.slice(0, limit)}
      onLoadMoreClick={onLoadMoreClick}
    />
  );
};

export default PokedexPageContainer;
