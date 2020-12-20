import { PokemonResponse, SpeciesResponse, useGen } from "helpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import Navigation from "components/Navigation";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { getPokemon, getPokemonSpecies } from "helpers/api";
import { PokemonCard, PokemonCardLoading } from "components/Card";

const PokemonPage: React.FC = () => {
  const { currentGen } = useGen();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [species, setSpecies] = useState<SpeciesResponse | null>(null);

  const genLength = currentGen ? currentGen.pokemon.length - 1 : 0;

  useEffect(() => {
    Promise.all([getPokemon(id), getPokemonSpecies(id)]).then(([pkm, spc]) => {
      setPokemon(pkm);
      setSpecies(spc);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Container className="wide">
      {pokemon && (
        <Navigation
          previousID={pokemon.id === 1 ? genLength : pokemon.id - 1}
          nextID={pokemon.id === genLength ? 1 : pokemon.id + 1}
          type={pokemon ? pokemon.types[0] : "steel"}
        />
      )}

      <Row>
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
