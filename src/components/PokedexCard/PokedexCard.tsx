import React from "react";
import { Card, CardID, CardPill } from "./PokedexCard.styles";

interface iProps {
  name: string;
  id: number;
  types: string[];
  img: string;
}

const PokedexCard: React.FC<iProps> = ({ name, id, types, img }: iProps) => (
  <Card>
    <Card.Img src={img} />
    <CardID>#{id}</CardID>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      {types.map((type) => (
        <CardPill key={type}>{type}</CardPill>
      ))}
    </Card.Body>
  </Card>
);

export default PokedexCard;
