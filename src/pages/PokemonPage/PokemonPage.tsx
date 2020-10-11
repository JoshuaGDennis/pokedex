import React from "react";
import { PokemonProps } from "helpers/types";
import PokemonCard from "components/PokemonCard";
import Container from "react-bootstrap/Container";

const PokemonPage: React.FC<PokemonProps> = (props) => (
  <Container fluid>
    <PokemonCard {...props} />
  </Container>
);

export default PokemonPage;
