import Card from "../Card";
import "../styles/PokedexCard.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { forwardRef } from "react";
import Pokeball from "components/Pokeball";

const PokedexCardLoading = forwardRef<HTMLDivElement>((_, ref) => (
  <Card className="pokedex-card bg-steel" ref={ref}>
    <Card.Body>
      <p className="pokedex-card__id loading">#00</p>
      <Pokeball className="loading-ball" />
      <Row>
        <Col className="pokedex-card__image-col"></Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col>
          <h1 className="text-center loading">LOADING</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center color-grass loading">LOADING</p>
        </Col>
        <Col>
          <p className="text-center color-poison loading">LOADING</p>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
));

export default PokedexCardLoading;
