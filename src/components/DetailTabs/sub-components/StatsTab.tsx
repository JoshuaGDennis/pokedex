import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { capitalise, PokemonTypeResponse } from "helpers";

interface iProps {
  stats: {
    name: string;
    value: number;
  }[];
  types: PokemonTypeResponse[];
}

const StatsTab: React.FC<iProps> = ({ stats, types }) => {
  const doubleDamageFrom = [
    ...new Set(types.map((t) => t.doubleDamageFrom.map((n) => n)).flat()),
  ]
    .filter((x) => !types.find((t) => t.name === x))
    .map((name) => name);

  const halfDamageFrom = types[0] ? types[0].halfDamageFrom : [];

  return (
    <Tab.Content className="stats-tab">
      {stats.map(({ name, value }) => (
        <Row key={name}>
          <Col md={4}>
            <p>{capitalise(name)}</p>
          </Col>
          <Col md={6}>
            <div className={`stats-bar color-${types[0].name}`}>
              <span style={{ width: `${(value / 200) * 100}%` }} />
            </div>
          </Col>
          <Col md={2}>
            <p>{value}</p>
          </Col>
        </Row>
      ))}

      <Row>
        <Col className="damage-section">
          <h4>DOUBLE DAMAGE FROM</h4>
          {doubleDamageFrom.map((name) => (
            <p key={name} className={`bg-${name}`}>
              {capitalise(name)}
            </p>
          ))}
        </Col>

        {!!halfDamageFrom.length && (
          <Col className="damage-section">
            <h4>HALF DAMAGE FROM</h4>
            {halfDamageFrom.map((name) => (
              <p key={name} className={`bg-${name}`}>
                {capitalise(name)}
              </p>
            ))}
          </Col>
        )}
      </Row>
    </Tab.Content>
  );
};

export default StatsTab;
