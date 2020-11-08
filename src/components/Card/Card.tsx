import React from "react";
import "./Card.scss";
import Card, { CardProps } from "react-bootstrap/Card";

const CustomCard: React.FC<CardProps> = (props) => (
  <Card {...props}>
    <Card.Body>{props.children}</Card.Body>
  </Card>
);

export default CustomCard;
