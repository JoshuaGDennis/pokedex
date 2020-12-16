import Card from 'components/Card'
import Image from 'components/Image'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokedexCard from "components/PokedexCard";
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
        <Col>
          <Card className="selectable">
            <Row>
              <Col>#1</Col>
            </Row>
            <Row>
              <Col>
                <Image src={getPokemonSprite(1)} />
              </Col>
            </Row>
            <Row>
              <Col><h1>Bulbasuar</h1></Col>
            </Row>
            <Row>
              <Col>
                <p>Grass</p>
              </Col>
              <Col>
                <p>Poison</p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col></Col>
        <Col></Col>
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
