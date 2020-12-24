import * as React from 'react'
import * as API from 'helpers/api'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Types from 'helpers/types';
import { useParams } from "react-router-dom";
import Navigation from "components/Navigation";
import Container from "react-bootstrap/Container";
import NoPokemonFoundPage from './NoPokemonFoundPage';
import { PokemonCard, PokemonCardLoading } from "components/Card";

const { useEffect, useState } = React
const { getPokemon, getPokemonSpecies } = API

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Types.Pokemon | null>(null);
  const [species, setSpecies] = useState<Types.Species | null>(null);

  const [noPokemonFound, setNoPokemonFound] = useState(false)

  useEffect(() => {
    Promise.all([
      getPokemon(id).catch(err => console.log('No Pokemon found!')), 
      getPokemonSpecies(id).catch(err => console.log('No Species found!'))
    ])
      .then(([pkm, spc]) => {
        if(pkm && spc) {
          setPokemon(pkm);
          setSpecies(spc);
          setIsLoading(false);
          setNoPokemonFound(false)
        } else {
          setNoPokemonFound(true)
        }
      })
  }, [id]);

  if(noPokemonFound) return <NoPokemonFoundPage name={id} />

  return (
    <Container className="wide">
      <Navigation 
        pokemon={pokemon}
        loading={isLoading}
      />

      <Row className="mt-3">
        <Col xs={12}>
          {!isLoading && pokemon && species ? (
            <PokemonCard data={pokemon} species={species} />
          ) : (
            <PokemonCardLoading />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
