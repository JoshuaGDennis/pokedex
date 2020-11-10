import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SkeletonCard } from "components/Card";
import Container from "react-bootstrap/Container";

const PokemonPage: React.FC = () => (
  <Container>
    <Row>
      <Col md={4}>
        <SkeletonCard />
      </Col>
      <Col md={4}>
        <SkeletonCard />
      </Col>
      <Col md={4}>
        <SkeletonCard />
      </Col>
    </Row>
  </Container>
);

export default PokemonPage;
