import Card from "./Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SpeciesResponse } from "types";
import React, { useEffect, useState } from "react";
import { getSpecies } from "api";

interface iPokemonCardProps {
  id?: string;
}

const PokemonCard: React.FC<iPokemonCardProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<SpeciesResponse | null>(null);

  useEffect(() => {
    if (id) {
      getSpecies(id).then((data) => {
        setPokemon(data);
        setLoading(false);
        console.log(data);
      });
    }
  }, [id]);

  if (loading)
    return (
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

  return (
    <Card>
      <div className={`bg-${pokemon?.color} section`}></div>

      <Row>
        <Col>
          <div className="header">{pokemon?.name}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonCard;
