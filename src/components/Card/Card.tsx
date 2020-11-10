import "./Card.scss";
import React from "react";
import Card from "react-bootstrap/Card";

interface iCardProps {
  className?: string;
  children: React.ReactNode;
}

const CustomCard: React.FC<iCardProps> = ({
  className,
  children,
}: iCardProps) => (
  <Card className={className}>
    <Card.Body>{children}</Card.Body>
  </Card>
);

export default CustomCard;
