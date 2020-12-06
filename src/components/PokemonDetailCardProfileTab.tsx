import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import styles from "styles/PokemonCard.module.scss";
import { capitalise, PokemonAbilityResponse } from "helpers";

interface iProps {
  description: string;
  abilities: PokemonAbilityResponse[];
  exp: number;
  happiness: number;
  captureRate: number;
  growthRate: string;
}

const PokemonDetailCardProfileTab: React.FC<iProps> = ({
  description,
  abilities,
  exp,
  happiness,
  captureRate,
  growthRate,
}) => (
  <Tab.Content className={styles.cardTabsContent}>
    <p className="mb-4">{description}</p>

    <h4 className={styles.cardTabsContentHeading}>ABILITIES</h4>

    <Row className="ml-2 mb-4">
      {abilities.map(({ name, description }) => (
        <Col key={name} className={styles.cardAbility}>
          <h4>{capitalise(name)}</h4>
          <p>{description}</p>
        </Col>
      ))}
    </Row>
    <h4 className={styles.cardTabsContentHeading}>TRAINING</h4>
    <Row className="ml-2 mt-4">
      <Col>
        <p>Base Exp</p>
      </Col>
      <Col>
        <p>{exp}</p>
      </Col>
    </Row>
    <Row className="ml-2">
      <Col>
        <p>Base Happiness</p>
      </Col>
      <Col>
        <p>{happiness}</p>
      </Col>
    </Row>
    <Row className="ml-2">
      <Col>
        <p>Catch Rate</p>
      </Col>
      <Col>
        <p>{captureRate}</p>
      </Col>
    </Row>
    <Row className="ml-2">
      <Col>
        <p>Growth Rate</p>
      </Col>
      <Col>
        <p>{growthRate}</p>
      </Col>
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardProfileTab;
