import React from "react";
import { useQuery } from "react-query";
import Spinner from "components/Spinner";
import { getGeneration } from "helpers/api";
import { capitalise } from "helpers/strings";
import GenerationCard from "./GenerationCard";
import { Card } from "./GenerationCard.styles";

interface iProps {
  name: string;
}

const GenerationCardContainer: React.FC<iProps> = ({ name }: iProps) => {
  const splitName = name.split("-");

  const { isLoading, data } = useQuery(name, getGeneration);

  if (isLoading || !data) {
    return (
      <Card>
        <Spinner />
      </Card>
    );
  }

  return (
    <GenerationCard
      name={`${capitalise(splitName[0])} ${splitName[1].toUpperCase()}`}
      to={`/pokedex/${name}`}
      region={`${capitalise(data.main_region.name)} region`}
    />
  );
};

export default GenerationCardContainer;
