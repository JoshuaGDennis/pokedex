import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stats from "./components/Stats";
import { PokemonProps } from "helpers/types";
import CardSection from "./components/CardSection";
import { StyledCard as Card, PokemonID, TypePill } from "./PokemonCard.styles";

const PokemonCard: React.FC<PokemonProps> = ({
  id,
  name,
  description,
  image,
  stats,
  types,
}: PokemonProps) => (
  <Card>
    <PokemonID>#{id}</PokemonID>
    <Card.Body>
      <Row>
        <Col>
          <h1>{name}</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          {types.map(({ name, secondary }) => (
            <TypePill key={name} color={secondary}>
              {name}
            </TypePill>
          ))}

          <p>{description}</p>
        </Col>

        <Col style={{ textAlign: "center" }}>
          <Card.Img src={image} />
          <Stats
            stats={stats}
            colors={{
              primary: types[0].primary,
              secondary: types[0].secondary,
            }}
          />
        </Col>
      </Row>

      <CardSection title="Abilities">CHILDREN</CardSection>

      <CardSection title="Weaknesses">CHILDREN</CardSection>

      <CardSection title="Evolutions">CHILDREN</CardSection>

      <CardSection title="Moves">CHILDREN</CardSection>
    </Card.Body>
  </Card>
);

export default PokemonCard;
