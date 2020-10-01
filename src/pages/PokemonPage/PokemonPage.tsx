import React from "react";
import { Container } from "react-bootstrap";

interface iProps {
  name: string;
}

const PokemonPage: React.FC<iProps> = ({ name }: iProps) => (
  <Container fluid>
    <h1>{name}</h1>
  </Container>
);

export default PokemonPage;
