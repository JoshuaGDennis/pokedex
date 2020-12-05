import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonResponse } from "helpers/types";
import PokemonCard from "components/PokemonCard";
import Container from "react-bootstrap/Container";
import { useLocation, useParams } from "react-router-dom";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<PokemonResponse>();

  console.log(id, location);

  return (
    <Container className="wide">
      <Row className="justify-content-md-center" style={{ marginTop: "5rem" }}>
        <Col xs={12}>
          <PokemonCard data={location.state} />
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
