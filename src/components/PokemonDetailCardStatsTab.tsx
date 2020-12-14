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

  const doubleDamageFrom = [...new Set(types.map(t => t.doubleDamageFrom.map(n => n)).flat())].filter(x => !types.find(t => t.name === x)).map(name => name)

  return (
    <Tab.Content className={styles.cardTabsContent}>
      {stats.map(({ name, value }) => (
        <Row key={name} className={styles.cardStat}>
          <Col md={4}>
            <p>{capitalise(name)}</p>
          </Col>
          <Col md={6}>
            <div
              className={`${styles.cardStatBar} ${
                styles[`cardStatBarType${types[0].name}`]
              }`}
            />
          </Col>
          <Col md={2}>
            <p>{value}</p>
          </Col>
        </Row>
      ))}

      <Row>
        <Col>
          <h4 className={`${styles.cardTabsContentHeading} mt-4 mb-4`}>
            DOUBLE DAMAGE FROM
          </h4>
          {doubleDamageFrom.map(name => (
            <p key={name} className={`${styles.cardType} bg-${name}`}>
              {capitalise(name)}
            </p>
          ))}
        </Col>
        <Col>
          <h4 className={`${styles.cardTabsContentHeading} mt-4 mb-4`}>
            HALF DAMAGE TO
          </h4>
          {types[0].halfDamageFrom.map(name => (
            <p key={name} className={`${styles.cardType} bg-${name}`}>
              {capitalise(name)}
            </p>
          ))}
        </Col>
      </Row>
    </Tab.Content>
  );
};

export default PokemonDetailCardStatsTab;
