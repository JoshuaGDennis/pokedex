import { useQuery } from "react-query";
import PokedexPage from "./PokedexPage";
import { KeyValue } from "helpers/types";
import { getGeneration } from "helpers/api";
import { useParams } from "react-router-dom";
import { getIdFromUrl } from "helpers/strings";
import React, { useEffect, useState } from "react";

const LIST_LIMIT = 30;

const PokedexPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(id, getGeneration);

  const [offset, setOffset] = useState<number>(0);
  const [sortedData, setSortedData] = useState<KeyValue[]>([]);
  const [pokemonList, setPokemonList] = useState<KeyValue[]>([]);

  const updatePokemonList = () => {
    if (sortedData.length) {
      setPokemonList(sortedData.slice(offset, offset + LIST_LIMIT));
    }
  };

  const onLoadMoreClick = () => {
    setOffset((s) => s + LIST_LIMIT);
  };

  useEffect(() => {
    if (data) {
      setSortedData(
        data.pokemon_species.sort(
          (a, b) => +getIdFromUrl(a.url) - +getIdFromUrl(b.url)
        )
      );
    }
  }, [data]);

  useEffect(updatePokemonList, [sortedData, offset]);

  useEffect(() => {
    if (pokemonList.length) {
      console.log(pokemonList);
    }
  }, [pokemonList]);

  return (
    <PokedexPage onLoadMoreClick={onLoadMoreClick} pokemon={pokemonList} />
  );
};

export default PokedexPageContainer;
