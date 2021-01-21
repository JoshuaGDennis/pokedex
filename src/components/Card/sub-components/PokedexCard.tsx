import React, { useRef } from "react";
import Card from "../Card";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pokeball from "components/Pokeball";
import PokedexCardLoading from "./PokedexCardLoading";
import usePokemonService from "hooks/usePokemonService";
import useVisibility from "hooks/useVisibility";
import { capitalise } from "helpers/strings";

interface iProps {
  id: string;
  startLoad: boolean;
  onLoaded(): void;
}

const PokedexCard: React.FC<iProps> = ({ id, startLoad, onLoaded }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useVisibility(ref, { once: true });

  const pokemon = usePokemonService(id, isInView && startLoad);

  if (pokemon.status !== "loaded") return <PokedexCardLoading ref={ref} />;

  const { payload } = pokemon;

  return (
    <Card
      ref={ref}
      to={`/pokemon/${payload.name}`}
      className={`pokedex-card bg-${payload.types[0]}`}
    >
      <Card.Body>
        <p className="pokedex-card__id">#{payload.id}</p>
        <Pokeball className={`type-${payload.types[0]}`} />
        <Row>
          <Col className="pokedex-card__image-col">
            <Image src={payload.image} onLoad={onLoaded} />
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col>
            <h1 className="text-center">{capitalise(payload.name)}</h1>
          </Col>
        </Row>
        <Row>
          {payload.types.map((type) => (
            <Col key={type}>
              <p className={`text-center color-${type}`}>
                {type.toUpperCase()}
              </p>
            </Col>
          ))}
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PokedexCard;
