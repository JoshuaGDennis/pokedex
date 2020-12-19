import React from "react";
import Card from "../Card";
import "../styles/PokemonCard.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pokeball from "components/Pokeball";
import { capitalise, PokemonResponse, SpeciesResponse } from "helpers";

interface iProps {
  data: PokemonResponse;
  species: SpeciesResponse;
}

const PokemonCard: React.FC<iProps> = ({ data, species }) => (
  <Card className="pokemon-card">
    <Row>
      <Col>
        <Card className={`pokemon-card__show-card bg-${data.types[0]}`}>
          <Card.Body>
            <Row>
              <Col>
                <h1>{capitalise(data.name)}</h1>
                <h2>The {species.description}</h2>
              </Col>
              <Col>
                <h1 className="text-right">#{data.id}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src={data.image} noAnimate fluid />
                <Pokeball />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="pokemon-card__detail-card">
          <Card.Body>DETAIL</Card.Body>
        </Card>
      </Col>
    </Row>
  </Card>
);

export default PokemonCard;
