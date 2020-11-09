import "./HomePage.scss";
import Page from "components/Page";
import List from "components/List";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { GenerationResource } from "helpers/types";
import GenerationCard from "components/Card/Generation";
import { getGeneration, getGenerationList } from "helpers/api";

const HomePage: React.FC = () => {
  const { data } = useQuery("generationList", getGenerationList);
  const [generations, setGenerations] = useState<GenerationResource[]>([]);

  useEffect(() => {
    if (data) {
      Promise.all(data.results.map((g) => getGeneration(g.name))).then(
        setGenerations
      );
    }
  }, [data]);

  return (
    <Page>
      <h1>The Pokedex App</h1>

      <List
        isLoading={!generations.length}
        items={generations}
        renderItem={(item: GenerationResource, i) => (
          <GenerationCard item={item} />
        )}
      />
    </Page>
  );
};

export default HomePage;
