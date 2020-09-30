import { useQuery } from "react-query";
import PokedexPage from "./PokedexPage";
import { KeyValue } from "helpers/types";
import { getGeneration } from "helpers/api";
import { useParams } from "react-router-dom";
import { getIdFromUrl } from "helpers/strings";
import React, { useEffect, useState } from "react";

interface iState {
  pokemonList: KeyValue[];
  sortedData: KeyValue[];
  offset: number;
}

const LIST_LIMIT = 30;

const PokedexPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(id, getGeneration);

  const [state, setState] = useState<iState>({
    pokemonList: [],
    sortedData: [],
    offset: 0,
  });

  useEffect(() => {
    if (data) {
      setState((s) => ({
        ...s,
        sortedData: data.pokemon_species.sort(
          (a, b) => +getIdFromUrl(a.url) - +getIdFromUrl(b.url)
        ),
      }));
    }
  }, [data]);

  useEffect(() => {
    setState((s) => ({
      ...s,
      pokemonList: s.sortedData.slice(s.offset, s.offset + LIST_LIMIT),
    }));
  }, [state.sortedData, state.offset]);

  return (
    <PokedexPage
      onLoadMoreClick={() =>
        setState((s) => ({ ...s, offset: s.offset + LIST_LIMIT }))
      }
      pokemon={state.pokemonList}
    />
  );
};

export default PokedexPageContainer;
