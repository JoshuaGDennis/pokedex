import "./Navigation.scss";
import * as React from 'react'
import * as Hooks from 'helpers/hooks'
import * as helpers from 'helpers'
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pokeball from "components/Pokeball";

const { useGeneration } = Hooks
const { getPokemonForm } = helpers
const { useEffect, useState } = React

interface iProps {
  pokemon: helpers.PokemonResponse | null
  loading: boolean
}

const Navigation: React.FC<iProps> = ({ pokemon, loading }) => {
  const { currentGen } = useGeneration();

  const [next, setNext] = useState<helpers.PokemonFormResponse | null>(null);
  const [previous, setPrevious] = useState<helpers.PokemonFormResponse | null>(null);

  useEffect(() => {
    if(!loading && pokemon && currentGen) {
      const genLength = currentGen.pokemon.length - 1
      const nextID = pokemon.id === genLength ? 1 : pokemon.id + 1
      const previousID = pokemon.id === 1 ? genLength : pokemon.id - 1

      Promise.all([getPokemonForm(previousID), getPokemonForm(nextID)]).then(
        ([p, n]) => {
          setPrevious(p);
          setNext(n);
        }
        );
    }
  }, [pokemon, loading, currentGen]);

  return (
    <Row>
      <Col>
        <div className={`nav-button left ${!previous ? 'loading' : ''}`}>
          {previous && (
            <Link to={`/pokemon/${previous.name}`}>
              <Image src={previous.image} fluid noAnimate />
            </Link>
          )}
        </div>
      </Col>
      <Link to="/pokedex">
        <Pokeball className={`transparent-${pokemon ? pokemon.types[0] : 'steel'}`} />
      </Link>
      <Col>
        <div className={`nav-button right ${!next ? 'loading' : ''}`}>
          {next && (
            <Link to={`/pokemon/${next.name}`}>
              <Image src={next.image} fluid noAnimate />
            </Link>
          )}
        </div>
      </Col>
    </Row>
  )

}

export default Navigation;
