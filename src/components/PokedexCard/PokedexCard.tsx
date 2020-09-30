import React from "react";
import { Card } from "react-bootstrap";

interface iProps {
  name: string;
}

const PokedexCard: React.FC<iProps> = ({ name }: iProps) => (
  <Card>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
    </Card.Body>
  </Card>
);

export default PokedexCard;
