import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StatContainer } from "./Stats.styles";
import { KeyValue } from "helpers/types";

interface iProps {
  stats: {
    base_stat: number;
    effort: number;
    stat: KeyValue;
  }[];
  colors: {
    primary: string;
    secondary: string;
  };
}

const Stats: React.FC<iProps> = ({ stats, colors }: iProps) => (
  <div>
    {stats.map(({ stat, ...item }) => (
      <StatContainer
        key={stat.name}
        name={stat.name}
        value={item.base_stat}
        colors={colors}
      >
        <Row>
          <Col>
            <span className="stat-name">{stat.name}</span>
          </Col>
          <Col>
            <span className="stat-value" />
          </Col>
        </Row>
      </StatContainer>
    ))}
  </div>
);

export default Stats;
