import * as React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "components/Search";
import * as Hooks from 'helpers/hooks';
import * as Types from 'helpers/types';
import { PokedexCard } from "components/Card";
import GenDropdown from "components/GenDropdown";
import Container from "react-bootstrap/Container";
import VisibleElement from "components/VisibleElement";

const { useGeneration } = Hooks
const { useEffect, useRef, useState } = React

const PokedexPage: React.FC = () => {
  const INITIAL_LOAD_ID = 0;
  const INITIAL_MAXIMUM = 6;

  const lastGen = useRef<Types.Generation>()

  const [useSearch, setUseSearch] = useState(false)

  const [loadId, setLoadId] = useState(INITIAL_LOAD_ID);
  const [maximum, setMaximum] = useState(INITIAL_MAXIMUM);

  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [searchItems, setSearchItems] = useState<{ id: number; name: string }[]>([])

  const { currentGen } = useGeneration();

  const onSearchReset = () => {
    setSearchItems([])
    setUseSearch(false)
    setLoadId(INITIAL_LOAD_ID)
  }

  const onSearchSubmit = (results: {id: number, name: string}[]) => {
    setUseSearch(true)
    setSearchItems(results)
    setLoadId(INITIAL_LOAD_ID)
  }

  useEffect(() => {
    if (currentGen) {
      if (!lastGen.current) {
        lastGen.current = currentGen;
      } else if (lastGen.current.name !== currentGen.name) {
        setLoadId(INITIAL_LOAD_ID);
        setMaximum(INITIAL_MAXIMUM);
        lastGen.current = currentGen;
      }

      setItems(currentGen.pokemon.slice(0, maximum));
    }
  }, [currentGen, maximum]);

  return (
    <Container className="wide">
      <Row>
        <Col>
          <GenDropdown />
        </Col>
        <Col>
          <Search
            onReset={onSearchReset}
            onSubmit={onSearchSubmit}
          />
        </Col>
      </Row>
      <Row>
        {(useSearch ? searchItems : items).map((item, i) => (
          <Col xs={12} sm={6} md={4} key={item.id}>
            <PokedexCard
              id={item.name}
              startLoad={loadId === i}
              onLoaded={() => setLoadId((s) => s + 1)}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {loadId === maximum && (
            <VisibleElement onVisible={() => setMaximum((s) => s + 3)} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
