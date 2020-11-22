import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getGeneration } from "../api";
import { GenerationResponse } from "types";
import PokemonCard from "components/PokemonCard";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";

const PokemonPage: React.FC = () => {
  const [ID, setID] = useState(1);
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);

  useEffect(() => {
    getGeneration(ID).then(setGeneration);
  }, [ID]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          {generation ? <PokemonCard id={generation.pokemon[0]} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
