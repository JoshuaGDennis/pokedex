import React from "react";
import Card from "./Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SkeletonCard: React.FC = () => (
  <Card className="skeleton">
    <div className="section">
      <span />
    </div>

    <Row>
      <Col>
        <div className="header" />
      </Col>
    </Row>

    <Row>
      <Col>
        <span />
      </Col>
      <Col>
        <span />
      </Col>
    </Row>
  </Card>
);

export default SkeletonCard;
