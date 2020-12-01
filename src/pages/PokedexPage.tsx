import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import PokedexCard from "components/PokedexCard";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import GenerationDropdown from "components/GenerationDropdown";

const PokedexPage: React.FC = () => {
  const [ generation, setGeneration ] = useState<GenerationResponse | null>(null)

  return (
    <Container>
      <Row>
        <Col>
          <GenerationDropdown onChange={setGeneration}  />
        </Col>
      </Row>
      <Row>
        {generation && (
          generation.pokemon.map(({ name }) => (
            <Col xs={12} md={4} key={name}>
              <PokedexCard id={name} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default PokedexPage;
