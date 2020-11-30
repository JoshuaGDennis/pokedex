import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonResponse } from "helpers/types";
import PokemonCard from "components/PokemonCard";
import { useLocation, useParams } from "react-router-dom";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<PokemonResponse>();

  console.log(id, location);

  return (
    <Row className="justify-content-md-center" style={{ marginTop: "5rem" }}>
      <Col xs={12} md={11}>
        <PokemonCard data={location.state} />
      </Col>
    </Row>
  );
};

export default PokemonPage;
