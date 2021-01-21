import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "components/Search";
import { API_List } from "helpers/types";
import useAllService from "hooks/useAllService";
import GenDropdown from "components/GenDropdown";
import Container from "react-bootstrap/Container";
import React, { useEffect, useRef, useState } from "react";
import { useGenerationContext } from "context/GenerationContext";
import { PokedexCard } from "components/Card";
import VisibleElement from "components/VisibleElement";

const PokedexPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const [loadID, setLoadID] = useState(0);
  const [maxItems, setMaxItems] = useState(6);

  const [items, setItems] = useState<API_List>([]);

  const savedItems = useRef<API_List>([]);
  const generations = useGenerationContext();
  const allPokemon = useAllService("pokemon");

  // Search results
  useEffect(() => {
    if (searchValue.length >= 3) {
      if (allPokemon.status === "loaded") {
        setItems(
          allPokemon.payload.filter(
            ({ name }) =>
              name.indexOf(searchValue) > -1 && name.indexOf("-") === 1
          )
        );
      }
    } else {
      setLoadID(0);
      setItems(savedItems.current);
    }
  }, [allPokemon, searchValue]);

  // Generation results
  useEffect(() => {
    if (generations.status === "loaded") {
      const newItems = generations.current.pokemon.slice(0, maxItems);

      savedItems.current = newItems;
      setItems(newItems);
    }
  }, [generations, maxItems]);

  return (
    <Container className="wide">
      <Row>
        <Col>
          <GenDropdown onChange={() => setLoadID(0)} />
        </Col>
        <Col>
          <Search value={searchValue} onChange={setSearchValue} />
        </Col>
      </Row>
      <Row>
        {items.map((item, i) => (
          <Col xs={12} sm={6} md={4} key={item.id}>
            <PokedexCard
              id={item.name}
              startLoad={loadID === i}
              onLoaded={() => setLoadID((s) => s + 1)}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {loadID === maxItems && (
            <VisibleElement onVisible={() => setMaxItems((s) => s + 3)} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
