import React from "react";
import { PokemonResource } from "helpers/types";
import { Card, CardID, CardPill, Link } from "./PokedexCard.styles";

interface iProps {
  name: string;
  id: number;
  types: { name: string; color: string }[];
  img: string;
  pokemonColor: string;
  pokemonData: PokemonResource;
}

const PokedexCard: React.FC<iProps> = ({
  name,
  id,
  types,
  img,
  pokemonColor,
  pokemonData,
}: iProps) => (
  <Card color={pokemonColor}>
    <Link to={{ pathname: `/pokemon/${id}`, state: pokemonData }}>
      <Card.Img src={img} />
      <CardID>#{id}</CardID>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {types.map(({ name, color }) => (
          <CardPill key={name} color={color}>
            {name}
          </CardPill>
        ))}
      </Card.Body>
    </Link>
  </Card>
);

export default PokedexCard;
