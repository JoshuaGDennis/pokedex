import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokedexCard from "components/PokedexCard";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import VisibleElement from "components/VisibleElement";
import React, { useEffect, useRef, useState } from "react";
import GenerationDropdown from "components/GenerationDropdown";

const PokedexPage: React.FC = () => {
  const INITIAL_LOAD_ID = 0;
  const INITIAL_MAXIMUM = 6;

  const lastGen = useRef<GenerationResponse>();

  const [loadId, setLoadId] = useState(INITIAL_LOAD_ID);
  const [maximum, setMaximum] = useState(INITIAL_MAXIMUM);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);

  useEffect(() => {
    if (generation) {
      if (!lastGen.current) {
        lastGen.current = generation;
      } else if (lastGen.current.name !== generation.name) {
        setLoadId(INITIAL_LOAD_ID);
        setMaximum(INITIAL_MAXIMUM);
        lastGen.current = generation;
      }

      setItems(generation.pokemon.slice(0, maximum));
    }
  }, [generation, maximum]);

  return (
    <Container className="wide">
      <Row>
        <Col>
          <GenerationDropdown onChange={setGeneration} />
        </Col>
      </Row>
      <Row>
        {items.map((pkm, i) => (
          <Col key={pkm.name} xs={12} md={4}>
            <PokedexCard
              id={pkm.name}
              startLoad={loadId === i}
              loaded={() => setLoadId((s) => s + 1)}
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
