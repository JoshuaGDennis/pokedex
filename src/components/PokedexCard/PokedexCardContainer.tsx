import React from "react";
import PokedexCard from "./PokedexCard";

interface iProps {
  name: string;
}

const PokedexCardContainer: React.FC<iProps> = ({ name }: iProps) => {
  return <PokedexCard name={name} />;
};

export default PokedexCardContainer;
