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

const PokemonDetailCardStatsTab: React.FC<iProps> = ({ stats, types }) => {
  const getTypes = (key: "doubleDamageFrom" | "halfDamageTo") =>
    [...new Set(types.map((t) => t[key].map((n) => n)).flat())].filter(
      (s) => !types.find((t) => t.name === s)
    );

  return (
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
          <h5>DOUBLE DAMAGE FROM</h5>
          <Row>
            <Col>
              {getTypes("doubleDamageFrom").map((name) => (
                <div key={name} className={`${styles.cardType} bg-${name}`}>
                  <p>{capitalise(name)}</p>
                  <span className={`bg-${name}--lighter`}>x2</span>
                </div>
              ))}
            </Col>
          </Row>
          <h5>HALF DAMAGE FROM</h5>
          <Row>
            <Col>
              {getTypes("halfDamageTo").map((name) => (
                <div key={name} className={`${styles.cardType} bg-${name}`}>
                  <p>{capitalise(name)}</p>
                  <span className={`bg-${name}--lighter`}>x0.5</span>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Tab.Content>
  );
};

export default PokemonDetailCardStatsTab;
