import React from "react";
import Button from "components/Button";
import { Col, Container, Row } from "react-bootstrap";
import { KeyValue } from "helpers/types";

interface iProps {
  onLoadMoreClick(): void;
  pokemon: KeyValue[];
}

const PokedexPage: React.FC<iProps> = ({
  onLoadMoreClick,
  pokemon,
}: iProps) => (
  <Container fluid>
    <Row>
      <Col>
        <h1>Pokedex Page!</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button onClick={() => onLoadMoreClick()}>Load more</Button>
      </Col>
    </Row>

    <Row>
      <Col>
        {pokemon.map(({ name }) => (
          <p key={name}>{name}</p>
        ))}
      </Col>
    </Row>
  </Container>
);

export default PokedexPage;
