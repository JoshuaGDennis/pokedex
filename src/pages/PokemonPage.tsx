import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import Navigation from "components/Navigation";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import useFormService from "hooks/useFormService";
import usePokemonService from "hooks/usePokemonService";
import useSpeciesService from "hooks/useSpeciesService";
import { PokemonCard, PokemonCardLoading } from "components/Card";
import NoPokemonFoundPage from "./NoPokemonFoundPage";
import useAbilityService from "hooks/useAbilityService";

const PokemonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [nextID, setNextID] = useState(0);
  const [speciesID, setSpeciesID] = useState(0);
  const [previousID, setPreviousID] = useState(0);

  const [abilityIDs, setAbilityIds] = useState<number[]>([]);

  const [notFound, setNotFound] = useState(false);

  const pokemon = usePokemonService(id);

  const nextPokemon = useFormService(nextID, nextID !== 0);
  const previousPokemon = useFormService(previousID, previousID !== 0);
  const pokemonSpecies = useSpeciesService(speciesID, speciesID !== 0);

  const pokemonAbilities = useAbilityService(abilityIDs, abilityIDs.length > 0);

  useEffect(() => {
    if (pokemon.status === "loaded") {
      setNotFound(false);
      setSpeciesID(pokemon.payload.id);
      setNextID(pokemon.payload.nextID);
      setPreviousID(pokemon.payload.previousID);
    } else if (pokemon.status === "error") {
      setNotFound(true);
    }
  }, [pokemon]);

  if (notFound) return <NoPokemonFoundPage name={id} />;

  return (
    <Container className="wide">
      <Navigation
        nextPokemon={nextPokemon}
        previousPokemon={previousPokemon}
        color={pokemon.status === "loaded" ? pokemon.payload.types[0] : "steel"}
      />
      <Row className="mt-3">
        <Col xs={12}>
          {pokemon.status === "loaded" && pokemonSpecies.status === "loaded" ? (
            <PokemonCard
              data={pokemon.payload}
              species={pokemonSpecies.payload}
            />
          ) : (
            <PokemonCardLoading />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonPage;
