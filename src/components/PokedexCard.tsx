import {
  PokemonResponse,
  useTheme,
  useVisibility,
  capitalise,
  useApi,
} from "helpers";
import Image from "./Image";
import Pokeball from "./Pokeball";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styles from "styles/PokedexCard.module.scss";
import PokedexCardLoading from "./PokedexCardLoading";
import React, { useEffect, useState, useRef } from "react";

interface iProps {
  id: string;
  startLoad: boolean;
  loaded(): void;
}

const PokedexCard: React.FC<iProps> = ({ id, startLoad, loaded }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  const theme = useTheme();
  const { getPokemon } = useApi();
  const inView = useVisibility(ref, { once: true });

  useEffect(() => {
    if (inView && startLoad) {
      getPokemon(id).then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }
  }, [inView, startLoad, getPokemon, id]);

  if (isLoading || !pokemon) return <PokedexCardLoading cardRef={ref} />;

  const typeColor = pokemon.types[0];

  return (
    <Link
      className={styles.link}
      to={{
        pathname: `/pokemon/${pokemon.name}`,
        state: pokemon,
      }}
    >
      <Card
        ref={ref}
        className={`${styles.card} ${
          styles[theme === "light" ? typeColor : `${typeColor}--dark`]
        }`}
      >
        <Pokeball type={pokemon.types[0]} />

        <Card.Body className={[styles.body, `bg-${typeColor}`].join(" ")}>
          <Row>
            <Col>
              <p className={styles.id}>#{pokemon.id}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className={styles.image}
                src={pokemon.image}
                onLoad={loaded}
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
          <Row className="mt-3">
            {pokemon.types.map((type) => (
              <Col key={type}>
                <p className={`${styles.type} color-${type}`}>
                  {type.toUpperCase()}
                </p>
              </Col>
            ))}
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default PokedexCard;
