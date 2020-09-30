import React from "react";
import Button from "components/Button";
import { KeyValue } from "helpers/types";
import PokedexCard from "components/PokedexCard";
import { Col, Container, Row } from "react-bootstrap";

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
      {pokemon.map(({ name }) => (
        <PokedexCard key={name} name={name} />
      ))}
    </Row>

    <Button onClick={() => onLoadMoreClick()}>Load more</Button>
  </Container>
);

export default PokedexPage;
