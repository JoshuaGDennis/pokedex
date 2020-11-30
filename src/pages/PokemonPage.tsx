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
        {generation.pokemon.map((id) => (
          <Col xs={12} md={4} key={id}>
            <PokemonCard id={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PokemonPage;
