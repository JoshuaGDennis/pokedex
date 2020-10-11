import React from "react";
import {
  StyledCard as Card,
  PokemonID,
  TypePill,
  Ability,
  Weakness,
} from "./PokemonCard.styles";
import { pokemonTypes } from "theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stats from "./components/Stats";
import { PokemonProps } from "helpers/types";
import CardSection from "./components/CardSection";

const PokemonCard: React.FC<PokemonProps> = ({
  id,
  abilities,
  name,
  description,
  image,
  stats,
  types,
  weaknesses,
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

      <CardSection title="Abilities">
        <Row>
          {abilities.map(({ name, description }) => (
            <Ability key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
            </Ability>
          ))}
        </Row>
      </CardSection>

      <CardSection title="Weaknesses">
        {weaknesses.map((item) => (
          <Weakness key={item} colors={pokemonTypes[item.toLowerCase()]}>
            {item}
          </Weakness>
        ))}
      </CardSection>

      <CardSection title="Evolutions">CHILDREN</CardSection>

      <CardSection title="Moves">CHILDREN</CardSection>
    </Card.Body>
  </Card>
);

export default PokemonCard;
