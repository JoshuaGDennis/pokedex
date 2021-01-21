import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface iProps {
  name: string;
}

const NoPokemonFoundPage: React.FC<iProps> = ({ name }) => (
  <Container className="wide">
    <h1>No Pokemon found matching {name}</h1>
    <Link to="/pokedex">
      <Button>Back to pokedex</Button>
    </Link>
  </Container>
);

export default NoPokemonFoundPage;
