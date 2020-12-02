import Image from "./Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LoadingCard from "./LoadingCard";
import styles from "styles/cards.module.scss";
import miscStyles from "styles/misc.module.scss";
import React, { useEffect, useState, useRef } from "react";
import {
  PokemonResponse,
  useTheme,
  useVisibility,
  capitalise,
  useApi,
} from "helpers";

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

  if (isLoading || !pokemon) return <LoadingCard cardRef={ref} />;

  return (
    <Link
      className={miscStyles.link}
      to={{
        pathname: `/pokemon/${pokemon.name}`,
        state: pokemon,
      }}
    >
      <Card ref={ref} className={styles.cardSelectable}>
        <div className={miscStyles[`pokeball_${pokemon.types[0]}`]}>
          <div className={miscStyles.inner} />
        </div>

        <Card.Body
          className={[
            styles.cardBodyRounded,
            `bg-${pokemon.types[0]}${theme === "dark" ? "--darker" : ""}`,
          ].join(" ")}
        >
          <Row>
            <Col>
              <p className={styles.cardId}>#{pokemon.id}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className={styles.cardImage}
                src={pokemon.image}
                onLoad={loaded}
                fluid
              />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className={styles.cardFooterRounded}>
          <Row>
            <Col>
              <p className={styles.cardName}>{capitalise(pokemon.name)}</p>
            </Col>
          </Row>
          <Row className="mt-3">
            {pokemon.types.map((type) => (
              <Col key={type}>
                <p className={`${styles.cardType} bg-${type}`}>
                  {capitalise(type)}
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
