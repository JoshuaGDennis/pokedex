import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useLocation, useParams } from "react-router-dom";
import { PokemonResponse } from "helpers/types";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ state: PokemonResponse }>();

  return (
    <Container>
      <Row>
        <Col>A CARD HERE</Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
