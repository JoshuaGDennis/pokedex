import React from "react";
import { Card, CardID, CardPill, Link } from "./PokedexCard.styles";

interface iProps {
  name: string;
  id: number;
  types: { name: string; color: string }[];
  img: string;
  pokemonColor: string;
}

const PokedexCard: React.FC<iProps> = ({
  name,
  id,
  types,
  img,
  pokemonColor,
}: iProps) => (
  <Card color={pokemonColor}>
    <Link to={`/pokemon/${id}`}>
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
