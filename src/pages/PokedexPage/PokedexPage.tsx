import { getGeneration } from "helpers/api";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PokedexPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(id, getGeneration);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Pokedex Page!</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
