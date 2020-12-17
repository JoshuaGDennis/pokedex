import Card from "../Card";
import "../styles/PokedexCard.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pokeball from "components/Pokeball";
import React, { useEffect, useRef, useState } from "react";
import { getPokemonSprite, PokemonResponse, useVisibility } from "helpers";
import { getPokemon } from "helpers/api";

interface iProps {
  id: string;
  startLoad: boolean;
  onLoaded(): void;
}

const PokedexCard: React.FC<iProps> = ({ id, startLoad, onLoaded }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useVisibility(ref, { once: true });

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  const isReady = !isLoading && !!pokemon;
  const typeColor = pokemon ? pokemon.types[0] : "bg-steel";

  console.log(inView);

  useEffect(() => {
    if (inView && startLoad) {
      getPokemon(id).then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }
  }, [inView, startLoad, id]);

  return (
    <Card
      ref={ref}
      to={isReady ? `/pokemon/${pokemon?.name}` : ""}
      className={`pokedex-card ${typeColor}`}
    >
      <Card.Body>
        <p className={`pokedex-card__id ${!isReady ? "loading" : ""}`}>#1</p>
        <Pokeball className="type-grass" />
        <Row>
          <Col className="pokedex-card__image-col">
            <Image src={getPokemonSprite(1)} />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <h1 className={`text-center ${!isReady ? "loading" : ""}`}>
              Bulbasuar
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p
              className={`text-center color-grass ${!isReady ? "loading" : ""}`}
            >
              GRASS
            </p>
          </Col>
          <Col>
            <p
              className={`text-center color-poison ${
                !isReady ? "loading" : ""
              }`}
            >
              POISON
            </p>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PokedexCard;
