import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "react-bootstrap";
import { getGenerations } from "helpers/api";
import Button from "components/Button";
import { captialise } from "helpers/strings";

const HomePage: React.FC = () => {
  const { isLoading, data } = useQuery("generations", getGenerations);

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
              <Button>{captialise(name).replace("-", " ")}</Button>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
