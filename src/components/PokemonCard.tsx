import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getPokemon } from "helpers/api";
import Image from "react-bootstrap/Image";
import { PokemonResponse } from "helpers/types";
import { useTheme } from "helpers/ThemeContext";
import LoadingCard from "components/LoadingCard";
import useVisibility from "helpers/useVisibility";
import styles from "styles/PokemonCard.module.scss";
import { capitalise, addClasses } from "helpers/strings";
import React, { useEffect, useState, useRef } from "react";

interface iPokemonCardProps {
  id: string;
}

const PokemonCard: React.FC<iPokemonCardProps> = ({ id }) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  const inView = useVisibility(ref, () => console.log("IN VIEW"));

  useEffect(() => {
    if (inView) {
      getPokemon(id).then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }
  }, [id, inView]);

  if (isLoading || !pokemon) return <LoadingCard cardRef={ref} />;

  const mainType = pokemon.types[0];

  return (
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
            <Image
              className={addClasses(styles, [
                "image",
                isImageLoaded ? "loaded" : "",
              ])}
              src={pokemon.image}
              onLoad={() => setIsImageLoaded(true)}
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
          {pokemon.types.map((type) => (
            <Col key={type}>
              <p>{capitalise(type)}</p>
            </Col>
          ))}
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PokemonCard;
