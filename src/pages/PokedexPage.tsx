import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getGeneration } from "helpers/api";
import PokedexCard from "components/PokedexCard";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import React, { useEffect, useState } from "react";
import GenerationDropdown from "components/GenerationDropdown";

const PokedexPage: React.FC = () => {
  const [ID, setID] = useState(1);
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);

  useEffect(() => {
    getGeneration(ID).then(setGeneration);
  }, [ID]);

  if (!generation) return null;

  return (
    <Container>
      <Row>
        <Col>
          <GenerationDropdown onChange={setID} />
        </Col>
      </Row>
      <Row>
        {generation.pokemon.map((id) => (
          <Col xs={12} md={4} key={id}>
            <PokedexCard id={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PokedexPage;
