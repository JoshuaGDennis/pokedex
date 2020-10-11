import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StatContainer } from "./Stats.styles";

interface iProps {
  stats: {
    name: string;
    value: number;
  }[];
  colors: {
    primary: string;
    secondary: string;
  };
}

const Stats: React.FC<iProps> = ({ stats, colors }: iProps) => (
  <div>
    {stats.map((stat) => (
      <StatContainer {...stat} colors={colors}>
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
