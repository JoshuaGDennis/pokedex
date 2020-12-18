import { useGen } from "helpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokedexCard } from "components/Card";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import React, { useEffect, useRef, useState } from "react";
import GenDropdown from "components/GenDropdown";
import VisibleElement from "components/VisibleElement";

const PokedexPage: React.FC = () => {
  const INITIAL_LOAD_ID = 0;
  const INITIAL_MAXIMUM = 6;

  const lastGen = useRef<GenerationResponse>();

  const [loadId, setLoadId] = useState(INITIAL_LOAD_ID);
  const [maximum, setMaximum] = useState(INITIAL_MAXIMUM);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);

  const { currentGen } = useGen();

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
      </Row>
      <Row>
        {items.map((item, i) => (
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
