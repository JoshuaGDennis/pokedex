import React from "react";
import { PokemonResource } from "helpers/types";
import PokemonCard from "components/PokemonCard";
import Container from "react-bootstrap/Container";

interface iProps {
  id: string;
  data: PokemonResource;
}

const PokemonPage: React.FC<iProps> = (props: iProps) => (
  <Container fluid>
    <PokemonCard {...props} />
  </Container>
);

export default PokemonPage;
