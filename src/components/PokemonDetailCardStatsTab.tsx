import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import styles from "styles/PokemonCard.module.scss";
import { capitalise, PokemonTypeResponse } from "helpers";

interface iProps {
  stats: {
    name: string;
    value: number;
  }[];
  types: PokemonTypeResponse[];
}

const PokemonDetailCardStatsTab: React.FC<iProps> = ({ stats, types }) => (
  <Tab.Content className={styles.cardTabsContent}>
    {stats.map(({ name, value }) => (
      <Row key={name} className={styles.cardStat}>
        <Col>
          <p>{capitalise(name)}</p>
        </Col>
        <Col>
          <div
            className={`${styles.cardStatBar} ${
              styles[`cardStatBarType${types[0].name}`]
            }`}
          />
        </Col>
        <Col>
          <p>{value}</p>
        </Col>
      </Row>
    ))}

    <Row>
      <Col>
        <h5>STRENGTHS</h5>
        <Row>
          {types.map((type) =>
            type.doubleDamageTo.map((name) => (
              <Col key={name}>
                <p>{capitalise(name)}</p>
              </Col>
            ))
          )}
        </Row>
      </Col>
      <Col>
        <h5>WEAKNESSES</h5>
      </Col>
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardStatsTab;
