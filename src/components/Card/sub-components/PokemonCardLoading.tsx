import React from "react";
import Card from "../Card";
import "../styles/PokemonCard.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pokeball from "components/Pokeball";

const PokemonCardLoading: React.FC = () => (
  <Card className="pokemon-card">
    <Row className="h-100">
      <Col className="pr-0">
        <Card className="pokemon-card__show-card bg-steel">
          <Card.Body>
            <Row>
              <Col>
                <h1 className="loading">PKMN NAME</h1>
                <h2 className="loading mt-3">THE PKMN GENERA</h2>
              </Col>
              <Col>
                <h1 className="text-right loading float-right">#00</h1>
              </Col>
            </Row>
            <Row className="h-75">
              <Col>
                <Pokeball className="type-steel" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="pl-0">
        <Card className="pokemon-card__detail-card">
          <Card.Body>Loading...</Card.Body>
        </Card>
      </Col>
    </Row>
  </Card>
);

export default PokemonCardLoading;
