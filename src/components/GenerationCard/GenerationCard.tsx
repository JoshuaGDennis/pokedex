import React from "react";
import { Card, Link } from "./GenerationCard.styles";

interface iProps {
  name: string;
  to: string;
  region: string;
}

const GenerationCard: React.FC<iProps> = ({ name, to, region }: iProps) => (
  <Card>
    <Link to={to}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <span>{region}</span>
      </Card.Body>
    </Link>
  </Card>
);

export default GenerationCard;
