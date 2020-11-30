import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getGeneration } from "helpers/api";
import PokemonCard from "components/PokemonCard";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import React, { useEffect, useState } from "react";

const PokemonPage: React.FC = () => {
  const [ID, setID] = useState(1);
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);

  useEffect(() => {
    getGeneration(ID).then(setGeneration);
  }, [ID]);

  if (!generation) return null;

  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <PokemonCard id={generation.pokemon[0]} />
        </Col>
        <Col xs={12} md={4}>
          <PokemonCard id={generation.pokemon[3]} />
        </Col>
        <Col xs={12} md={4}>
          <PokemonCard id={generation.pokemon[6]} />
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
