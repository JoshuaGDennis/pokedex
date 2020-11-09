import "./Card.scss";
import Card from "./Card";
import React from "react";
import { PokemonResource } from "helpers/types";

interface IPokemonSmallCardProps {
  pokemon: PokemonResource;
}

const PokemonSmallCard: React.FC<IPokemonSmallCardProps> = ({
  pokemon,
}: IPokemonSmallCardProps) => (
  <Card className="pokemon-card small">{pokemon.name}</Card>
);

export default PokemonSmallCard;
