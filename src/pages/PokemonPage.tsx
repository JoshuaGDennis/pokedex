import {
  PokemonAbilityResponse,
  PokemonResponse,
  PokemonTypeResponse,
  SpeciesResponse,
} from "helpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import NavButtons from "components/NavButtons";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import styles from "styles/PokemonCard.module.scss";
import PromiseLoader from "components/PromiseLoader";
import PokemonShowCard from "components/PokemonShowCard";
import PokemonDetailCard from "components/PokemonDetailCard";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getPokemon,
  getPokemonAbility,
  getPokemonSpecies,
  getPokemonType,
} from "helpers/api";
import PokemonShowCardLoading from "components/PokemonShowCardLoading";
import PokemonDetailCardLoading from "components/PokemonDetailCardLoading";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<PokemonResponse>();
  const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);

  useEffect(() => {
    location.state
      ? setPokemon(location.state)
      : getPokemon(id).then(setPokemon);
  }, [id, location.state]);

  return (
    <Container className="wide">
      <Link to="/pokedex">Back to pokedex</Link>
      {pokemon && (
        <>
          <NavButtons currentID={pokemon.id} />
          <Row className="justify-content-center mt-3">
            <Col xs={12}>
              <Card className={styles.card}>
                <Row className="h-100">
                  <PromiseLoader
                    promises={[
                      getPokemonSpecies(pokemon.name),
                      Promise.all(pokemon.abilities.map(getPokemonAbility)),
                      Promise.all(pokemon.types.map(getPokemonType)),
                    ]}
                    render={([species, abilities, types]: [
                      SpeciesResponse,
                      PokemonAbilityResponse[],
                      PokemonTypeResponse[]
                    ]) => (
                      <>
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
                      </>
                    )}
                    renderLoading={() => (
                      <>
                        <Col className="pr-0">
                          <PokemonShowCardLoading />
                        </Col>
                        <Col className="pl-0">
                          <PokemonDetailCardLoading />
                        </Col>
                      </>
                    )}
                  />
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PokemonPage;
