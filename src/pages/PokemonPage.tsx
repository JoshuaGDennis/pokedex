import {
  PokemonFormResponse,
  PokemonResponse,
  SpeciesResponse,
  useGen,
} from "helpers";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getPokemon, getPokemonForm, getPokemonSpecies } from "helpers/api";
import { PokemonCard } from "components/Card";
import NavButton from "components/NavButton";
import Pokeball from "components/Pokeball";

const PokemonPage: React.FC = () => {
  const { currentGen } = useGen();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [species, setSpecies] = useState<SpeciesResponse | null>(null);

  const [next, setNext] = useState<PokemonFormResponse | null>(null);
  const [previous, setPrevious] = useState<PokemonFormResponse | null>(null);

  useEffect(() => {
    Promise.all([getPokemon(id), getPokemonSpecies(id)]).then(([pkm, spc]) => {
      setPokemon(pkm);
      setSpecies(spc);

      if (currentGen) {
        const genLength = currentGen.pokemon.length - 1;
        const prevId = pkm.id === 1 ? genLength : pkm.id - 1;
        const nextId = pkm.id === genLength ? 1 : pkm.id + 1;

        Promise.all([getPokemonForm(prevId), getPokemonForm(nextId)]).then(
          ([prev, next]) => {
            setPrevious(prev);
            setNext(next);
            setIsLoading(false);
          }
        );
      }
    });
  }, [id, currentGen]);

  return (
    <Container className="wide">
      <Row>
        <Col>
          {previous && (
            <NavButton
              to={`/pokemon/${previous.name}`}
              className="left"
              form={previous}
            />
          )}
        </Col>
        {pokemon && (
          <NavButton to="/pokedex" className="middle">
            <Pokeball className={`transparent-${pokemon.types[0]}`} />
          </NavButton>
        )}
        <Col>
          {next && (
            <NavButton
              to={`/pokemon/${next.name}`}
              className="right"
              form={next}
            />
          )}
        </Col>
      </Row>

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
