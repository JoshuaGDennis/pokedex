import React from "react";
import { useQuery } from "react-query";
import Button from "components/Button";
import { capitalise } from "helpers/strings";
import { getGenerationList } from "helpers/api";
import { Col, Container, Row } from "react-bootstrap";

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
          <Col>
            {data.results.map(({ name }) => (
              <Button key={name} to={`/pokedex/${name}`}>
                {capitalise(name).replace("-", " ")}
              </Button>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
