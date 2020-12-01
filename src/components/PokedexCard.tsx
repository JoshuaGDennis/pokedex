import Image from "./Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { getPokemon } from "helpers/api";
import { PokemonResponse } from "helpers/types";
import { useTheme } from "helpers/ThemeContext";
import LoadingCard from "components/LoadingCard";
import useVisibility from "helpers/useVisibility";
import styles from "styles/PokedexCard.module.scss";
import { capitalise, addClasses } from "helpers/strings";
import React, { useEffect, useState, useRef } from "react";

interface iPokedexCardProps {
  id?: string;
  skeleton?: boolean
}

const PokedexCard: React.FC<iPokedexCardProps> = ({ id = '0', skeleton }) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  const inView = useVisibility(ref, () => console.log("IN VIEW"));

  useEffect(() => {
    if (inView && !skeleton) {
      getPokemon(id).then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }
  }, [id, inView, skeleton]);

  if (isLoading || !pokemon || skeleton) return <LoadingCard cardRef={ref} />;

  const mainType = pokemon.types[0];

  return (
    <Link
      className={styles.link}
      to={{
        pathname: `/pokemon/${pokemon.name}`,
        state: pokemon,
      }}
    >
      <Card
        className={addClasses(styles, [
          "card",
          `${mainType}${theme === "dark" ? "--dark" : ""}`,
        ])}
        ref={ref}
      >
        <div className={styles.pokeball}>
          <div className={styles.inner} />
        </div>

        <Card.Body className={styles.body}>
          <Row>
            <Col>
              <p className={styles.id}>#{pokemon.id}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image className={styles.image} src={pokemon.image} fluid />
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
            {pokemon.types.map((type) => (
              <Col key={type}>
                <p className={`bg-${type}`}>{capitalise(type)}</p>
              </Col>
            ))}
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default PokedexCard;
