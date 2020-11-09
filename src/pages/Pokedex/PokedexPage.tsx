import "./PokedexPage.scss";
import Page from "components/Page";
import Card from "components/Card";
import List from "components/List";
import { useQuery } from "react-query";
import { getGeneration } from "helpers/api";
import React, { useEffect, useState } from "react";
import { GenerationResource } from "helpers/types";
import { useLocation, useParams } from "react-router-dom";
import { sortListByIds } from "helpers/funcs";
import { getIdFromUrl } from "helpers/strings";

const PokedexPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<GenerationResource>();

  const [pokemon, setPokemon] = useState<string[]>([]);

  useQuery(id, getGeneration, {
    enabled: !location.state,
    onSuccess: (data) =>
      setPokemon(data.pokemon_species.map(({ name }) => name)),
  });

  useEffect(() => {
    if (location.state) {
      setPokemon(location.state.pokemon_species.map(({ name }) => name));
    }
  }, [location]);

  return (
    <Page>
      <h1>PokedexPage</h1>

      <List
        isLoading={!pokemon.length}
        items={pokemon}
        renderItem={(item, i) => <Card className="pokedex-card">{item}</Card>}
        sortItems={(a, b) => +a.id - +b.id}
      />
    </Page>
  );
};

export default PokedexPage;
