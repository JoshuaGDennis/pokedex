import "./Navigation.scss";
import * as React from 'react';
import * as API from 'helpers/api';
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Types from 'helpers/types';
import * as Hooks from 'helpers/hooks';
import { Link } from "react-router-dom";
import Pokeball from "components/Pokeball";

const { getPokemonForm } = API
const { useGeneration } = Hooks
const { useEffect, useState } = React

interface iProps {
  id: number
  color: string
  loadingPokemon: boolean
}

const Navigation: React.FC<iProps> = ({ id, color, loadingPokemon }) => {
  const { currentGen } = useGeneration();

  const [isLoading, setIsLoading] = useState(true)
  const [next, setNext] = useState<Types.Form | null>(null);
  const [previous, setPrevious] = useState<Types.Form | null>(null);

  useEffect(() => {
    if(!loadingPokemon && currentGen) {
      const genLength = currentGen.pokemon.length - 1

      setIsLoading(true)
      Promise.all([
        getPokemonForm(id === 1 ? genLength : id - 1), // Previous
        getPokemonForm(id === genLength ? 1 : id + 1), // Next
      ]).then(([ previousForm, nextForm ]) => {
        setNext(nextForm)
        setPrevious(previousForm)
        setIsLoading(false)
      })
    }
  }, [id, loadingPokemon, currentGen])

  const buttonClasses = `nav-button ${isLoading ? 'loading' : ''}`

  return (
    <Row>
      <Col>
        <div className={`${buttonClasses} left`}>
          {!isLoading && previous && (
            <Link to={`/pokemon/${previous.name}`}>
              <Image src={previous.image} fluid noAnimate />
            </Link>
          )}
        </div>
      </Col>
      <Link to="/pokedex">
        <Pokeball className={`transparent-${color}`} />
      </Link>
      <Col>
        <div className={`${buttonClasses} right`}>
          {!isLoading && next && (
            <Link to={`/pokemon/${next.name}`}>
              <Image src={next.image} fluid noAnimate />
            </Link>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Navigation