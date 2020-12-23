import * as React from 'react'
import * as helpers from 'helpers'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import Navigation from "components/Navigation";
import Container from "react-bootstrap/Container";
import { PokemonCard, PokemonCardLoading } from "components/Card";

const { useEffect, useState } = React
const { getPokemon, getPokemonSpecies } = helpers

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<helpers.PokemonResponse | null>(null);
  const [species, setSpecies] = useState<helpers.SpeciesResponse | null>(null);


  useEffect(() => {
    Promise.all([getPokemon(id), getPokemonSpecies(id)]).then(([pkm, spc]) => {
      setPokemon(pkm);
      setSpecies(spc);
      setIsLoading(false);
    });
  }, [id]);

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
