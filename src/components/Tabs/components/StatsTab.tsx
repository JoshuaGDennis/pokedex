import * as React from 'react'
import "../styles/StatsTab.scss";
import * as helpers from 'helpers'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";

const { useEffect, useState } = React
const { capitalise, getPokemonType } = helpers

interface iProps {
  stats: {
    name: string;
    value: number;
  }[];
  types: string[];
}

const StatsTab: React.FC<iProps> = ({ stats, types }) => {
  const [typesDetail, setTypesDetail] = useState<helpers.PokemonTypeResponse[]>([]);

  useEffect(() => {
    Promise.all(types.map((type) => getPokemonType(type))).then(setTypesDetail);
  }, [types]);

  const doubleDamageFrom = [
    ...new Set(typesDetail.map((t) => t.doubleDamageFrom.map((n) => n)).flat()),
  ]
    .filter((x) => !typesDetail.find((t) => t.name === x))
    .map((name) => name);

  const halfDamageFrom = typesDetail[0] ? typesDetail[0].halfDamageFrom : [];

  return (
    <Tab.Content className="stats-tab">
      {stats.map(({ name, value }) => (
        <Row key={name} className="stat-section">
          <Col md={4}>
            <p>{capitalise(name)}</p>
          </Col>
          <Col md={6}>
            <div className="stat-bar">
              <span
                className={`bg-${types[0]}`}
                style={{ width: `${(value / 200) * 100}%` }}
              />
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
