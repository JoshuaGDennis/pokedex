import React from "react";
import { Container } from "react-bootstrap";

interface iProps {
  name: string;
  description: string;
}

const PokemonPage: React.FC<iProps> = ({ name, description }: iProps) => (
  <Container fluid>
    <h1>{name}</h1>
    <p>{description}</p>
  </Container>
);

export default PokemonPage;
