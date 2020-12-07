import {
  useApi,
  PokemonAbilityResponse,
  PokemonResponse,
  PokemonTypeResponse,
  SpeciesResponse,
} from "helpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import styles from "styles/PokemonCard.module.scss";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PokemonShowCard from "components/PokemonShowCard";
import PokemonDetailCard from "components/PokemonDetailCard";
import NavButtons from "components/NavButtons";

const PokemonPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const location = useLocation<PokemonResponse>();
  const { getAbility, getPokemon, getSpecies, getType } = useApi();

  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
  const [species, setSpecies] = useState<SpeciesResponse | null>(null);

  const [types, setTypes] = useState<PokemonTypeResponse[]>([]);
  const [abilities, setAbilities] = useState<PokemonAbilityResponse[]>([]);

  useEffect(() => {
    if (!pokemon) {
      if (location.state) {
        setPokemon(location.state);
      } else {
        getPokemon(id).then(setPokemon);
      }
    }
  }, [getPokemon, id, location.state, pokemon]);

  useEffect(() => {
    if (pokemon && !species) {
      getSpecies(pokemon.name).then(setSpecies);
    }
  }, [getSpecies, pokemon, species]);

  useEffect(() => {
    if (pokemon && !abilities.length) {
      Promise.all(pokemon.abilities.map((ability) => getAbility(ability))).then(
        setAbilities
      );
    }
  }, [getAbility, pokemon, abilities]);

  useEffect(() => {
    if (pokemon && !types.length) {
      Promise.all(pokemon.types.map((type) => getType(type))).then(setTypes);
    }
  }, [getType, pokemon, types]);

  if (pokemon && species && types.length && abilities.length) {
    return (
      <Container className="wide">
        <Button variant="primary" onClick={() => history.push("/pokedex")}>
          Back to pokedex
        </Button>
        <NavButtons currentID={pokemon.id} />
        <Row className="justify-content-center mt-3">
          <Col xs={12}>
            <Card className={styles.card}>
              <Row className="h-100">
                <Col className="pr-0">
                  <PokemonShowCard
                    id={pokemon.id}
                    name={pokemon.name}
                    description={species.genera}
                    image={pokemon.image}
                    type={pokemon.types[0]}
                  />
                </Col>
                <Col className="pl-0">
                  <PokemonDetailCard
                    data={pokemon}
                    types={types}
                    abilities={abilities}
                    species={species}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return <p>LOADING</p>;
};

export default PokemonPage;
