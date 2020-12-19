import { PokemonResponse, SpeciesResponse } from "helpers";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getPokemon, getPokemonSpecies } from "helpers/api";
import { PokemonCard } from "components/Card";

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
      <Link to="/pokedex">Back to pokedex</Link>

      {!isLoading && pokemon && species && (
        <Row className="justify-content-center mt-3">
          <Col xs={12}>
            <PokemonCard data={pokemon} species={species} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PokemonPage;
