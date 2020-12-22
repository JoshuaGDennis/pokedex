import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import Navigation from "components/Navigation";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { PokemonResponse, SpeciesResponse } from "helpers";
import { getPokemon, getPokemonSpecies } from "helpers/api";
import { PokemonCard, PokemonCardLoading } from "components/Card";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [species, setSpecies] = useState<SpeciesResponse | null>(null);


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
