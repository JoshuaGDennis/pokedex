import { Card, PokedexCard } from 'components/Card'
import Image from 'components/Image'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { GenerationResponse } from "helpers/types";
import VisibleElement from "components/VisibleElement";
import React, { useEffect, useRef, useState } from "react";
import GenerationDropdown from "components/GenerationDropdown";
import { getPokemonSprite, useGen } from "helpers";

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
          <GenerationDropdown />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4}>
          <PokedexCard />
        </Col>
        <Col sm={12} md={4}>
          <PokedexCard />
        </Col>
        <Col sm={12} md={4}>
          <PokedexCard />
        </Col>
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
