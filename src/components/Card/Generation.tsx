import { GenerationResource } from "helpers/types";
import "./Card.scss";
import Card from "./Card";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { capitalise, formatGeneration } from "helpers/strings";

interface IGenerationCardProps {
  item: GenerationResource;
}

const GenerationCard: React.FC<IGenerationCardProps> = ({
  item,
}: IGenerationCardProps) => {
  const generationName = formatGeneration(item.name);
  const regionName = capitalise(item.main_region.name);
  const versions = item.version_groups[0].name.split("-");

  return (
    <Card className="generation-card">
      <Link
        to={{
          pathname: `/pokedex/gen${item.id}`,
          state: item,
        }}
      >
        <Row>
          <Col className="circles">
            <div className={`circle v-bg-${versions[0]}`} />
            <div className={`circle v-bg-${versions[1]}`} />
          </Col>
          <Col xs={8} className="detail">
            <h2>{generationName}</h2>
            <p>{regionName} Region</p>
            {versions.map((str) => (
              <span key={str} className={`v-color-${str}`}>
                {capitalise(str)}
              </span>
            ))}
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default GenerationCard;
