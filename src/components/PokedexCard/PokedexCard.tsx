import React from "react";
import { Card, CardID, CardPill, Link } from "./PokedexCard.styles";

interface iProps {
  name: string;
  id: number;
  types: string[];
  img: string;
}

const PokedexCard: React.FC<iProps> = ({ name, id, types, img }: iProps) => (
  <Card>
    <Link to={`/pokemon/${id}`}>
      <Card.Img src={img} />
      <CardID>#{id}</CardID>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {types.map((type) => (
          <CardPill key={type}>{type}</CardPill>
        ))}
      </Card.Body>
    </Link>
  </Card>
);

export default PokedexCard;
