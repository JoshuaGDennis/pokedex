import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledCard as Card } from "./CardSection.styles";

interface iProps {
  title: string;
  children: React.ReactNode;
}

const CardSection: React.FC<iProps> = ({ title, children }) => (
  <Row>
    <Col>
      <Card>
        <Card.Title>
          <h2>{title}</h2>
        </Card.Title>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Col>
  </Row>
);

export default CardSection;
