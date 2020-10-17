import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardSection from "./components/CardSection";
import { StyledCard as Card, PokemonID } from "./PokemonCard.styles";

interface iProps {
  id: string;
  image: string;
  name: string;
  description: string;
  renderTypes(): React.ReactNode;
  renderAbilities(): React.ReactNode;
  renderDamages(): React.ReactNode[];
  renderStats(): React.ReactNode;
  renderEvolutions(): React.ReactNode | null;
}

const PokemonCard: React.FC<iProps> = ({
  id,
  image,
  name,
  description,
  renderTypes,
  renderAbilities,
  renderDamages,
  renderStats,
  renderEvolutions,
}: iProps) => (
  <Card>
    <PokemonID>#{id}</PokemonID>
    <Card.Body>
      <Row>
        <Col>
          <h1>{name}</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          {renderTypes()}
          <p>{description}</p>
        </Col>

        <Col style={{ textAlign: "center" }}>
          <Card.Img src={image} />
          {renderStats()}
        </Col>
      </Row>

      <CardSection title="Abilities">
        <Row>{renderAbilities()}</Row>
      </CardSection>

      <CardSection title="Weaknesses">{renderDamages()}</CardSection>

      {renderEvolutions()}

      <CardSection title="Moves">CHILDREN</CardSection>
    </Card.Body>
  </Card>
);

export default PokemonCard;
