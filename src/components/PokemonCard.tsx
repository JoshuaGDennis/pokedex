import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { SpeciesResponse } from "types";
import { getSpecies } from "helpers/api";
import Image from "react-bootstrap/Image";
import { capitalise } from "helpers/strings";
import LoadingCard from "components/LoadingCard";
import React, { useEffect, useState } from "react";
import styles from "styles/PokemonCard.module.scss";

interface iPokemonCardProps {
  id: string;
}

const PokemonCard: React.FC<iPokemonCardProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<SpeciesResponse | null>(null);

  useEffect(() => {
    getSpecies(id).then((data) => {
      setPokemon(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading || !pokemon) return <LoadingCard />;

  return (
    <Card className={styles.card}>
      <div className={styles.pokeball} data-color={pokemon.color}>
        <div className={styles.inner} />
      </div>
      <Card.Body className={`bg-${pokemon.color} ${styles.body}`}>
        <Row>
          <Col>
            <p className={styles.id}>#{pokemon.id}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image
              className={styles.image}
              src={`${process.env.PUBLIC_URL}/assets/pokemon/${pokemon.name}.png`}
              fluid
            />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className={styles.footer}>
        <Row>
          <Col>
            <p className={styles.name}>{capitalise(pokemon.name)}</p>
          </Col>
        </Row>
        <Row className={styles.types}>
          <Col>
            <p>Type 1</p>
          </Col>
          <Col>
            <p>Type 2</p>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PokemonCard;
