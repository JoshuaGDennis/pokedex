import Card from "../Card";
import * as React from 'react'
import * as API from 'helpers/api'
import "../styles/PokedexCard.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Hooks from 'helpers/hooks';
import * as Types from 'helpers/types';
import * as Strings from 'helpers/strings';
import Pokeball from "components/Pokeball";
import PokedexCardLoading from "./PokedexCardLoading";

const { getPokemon } = API
const { capitalise } = Strings
const { useVisibility } = Hooks
const { useEffect, useRef, useState } = React

interface iProps {
  id: string;
  startLoad: boolean;
  onLoaded(): void;
}

const PokedexCard: React.FC<iProps> = ({ id, startLoad, onLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Types.Pokemon | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const inView = useVisibility(ref, { once: true });

  useEffect(() => {
    if (inView && startLoad) {
      getPokemon(id).then((data) => {
        setPokemon(data);
        setIsLoading(false);
      });
    }
  }, [inView, startLoad, id]);

  if (!pokemon || isLoading) {
    return <PokedexCardLoading ref={ref} />;
  }

  return (
    <Card
      ref={ref}
      to={`/pokemon/${pokemon.name}`}
      className={`pokedex-card bg-${pokemon.types[0]}`}
    >
      <Card.Body>
        <p className="pokedex-card__id">#{pokemon.id}</p>
        <Pokeball className={`type-${pokemon.types[0]}`} />
        <Row>
          <Col className="pokedex-card__image-col">
            <Image src={pokemon.image} onLoad={onLoaded} />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <h1 className="text-center">{capitalise(pokemon.name)}</h1>
          </Col>
        </Row>
        <Row>
          {pokemon.types.map((type) => (
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
