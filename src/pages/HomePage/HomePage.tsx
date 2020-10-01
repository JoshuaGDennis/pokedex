import React from "react";
import { useQuery } from "react-query";
import { getGenerationList } from "helpers/api";
import { Col, Container, Row } from "react-bootstrap";
import GenerationCard from "components/GenerationCard";

const HomePage: React.FC = () => {
  const { isLoading, data } = useQuery("generationList", getGenerationList);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>The Pokedex App</h1>
        </Col>
      </Row>

      {isLoading && <span>Loading...</span>}

      {data && (
        <Row>
          {data.results.map(({ name }) => (
            <GenerationCard name={name} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
