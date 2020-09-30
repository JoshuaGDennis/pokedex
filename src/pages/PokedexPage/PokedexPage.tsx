import { getGeneration } from "helpers/api";
import { getIdFromUrl } from "helpers/strings";
import { KeyValue } from "helpers/types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface iState {
  pokemonList: KeyValue[];
  offset: number;
}

// Number limit of how many pokemon to display per 'page'
const LIST_LIMIT = 30;

const PokedexPage: React.FC = () => {
  const [state, setState] = useState<iState>({
    pokemonList: [],
    offset: 0,
  });

  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(id, getGeneration);

  useEffect(() => {
    if (data) {
      setState((s) => ({
        ...s,
        pokemonList: data.pokemon_species.sort((a, b) => {
          return +getIdFromUrl(a.url) - +getIdFromUrl(b.url);
        }),
      }));
    }
  }, [data]);

  useEffect(() => {
    if (state.pokemonList) {
      console.log(
        state.pokemonList.slice(state.offset, LIST_LIMIT + state.offset)
      );
    }
  }, [state.pokemonList, state.offset]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Pokedex Page!</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
