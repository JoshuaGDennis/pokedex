import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import PokedexLoader from "components/PokedexLoader";
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
      
      {generation && <PokedexLoader gen={generation} />}
    </Container>
  );
};

export default PokedexPage;
