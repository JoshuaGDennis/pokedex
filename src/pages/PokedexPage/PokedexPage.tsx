import { useQuery } from "react-query";
import { KeyValue } from "helpers/types";
import { getGeneration } from "helpers/api";
import { useParams } from "react-router-dom";
import { getIdFromUrl } from "helpers/strings";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "components/Button";

// Number limit of how many pokemon to display per 'page'
const LIST_LIMIT = 30;

const PokedexPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(id, getGeneration);

  const [offset, setOffset] = useState<number>(0);
  const [sortedData, setSortedData] = useState<KeyValue[]>([]);
  const [pokemonList, setPokemonList] = useState<KeyValue[]>([]);

  const updatePokemonList = () => {
    if (sortedData.length) {
      setPokemonList(sortedData.slice(offset, offset + LIST_LIMIT));
    }
  };

  useEffect(() => {
    if (data) {
      setSortedData(
        data.pokemon_species.sort(
          (a, b) => +getIdFromUrl(a.url) - +getIdFromUrl(b.url)
        )
      );
    }
  }, [data]);

  useEffect(updatePokemonList, [sortedData, offset]);

  useEffect(() => {
    if (pokemonList.length) {
      console.log(pokemonList);
    }
  }, [pokemonList]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Pokedex Page!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setOffset((s) => s + LIST_LIMIT)}>
            Load more
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {pokemonList.map(({ name }) => (
            <p>{name}</p>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
