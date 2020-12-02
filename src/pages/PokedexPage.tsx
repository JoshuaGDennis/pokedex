import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokedexCard from "components/PokedexCard";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { GenerationResponse } from "helpers/types";
import VisibilityElement from "components/VisibleElement";
import GenerationDropdown from "components/GenerationDropdown";

const PokedexPage: React.FC = () => {
  const [ loadId, setLoadId ] = useState(0)
  const [ maximum, setMaximum ] = useState(6)
  const [ items, setItems ] = useState<{id: number, name: string}[]>([])
  const [ generation, setGeneration ] = useState<GenerationResponse | null>(null)

  useEffect(() => {
    if (generation) {
      setLoadId(0)
      setItems(generation.pokemon.slice(0, maximum))
    }
  }, [generation, maximum])

  return (
    <Container>
      <Row>
        <Col>
          <GenerationDropdown onChange={setGeneration}  />
        </Col>
      </Row>
      <Row>
        {items.map((pkm, i) => (
          <Col key={pkm.id} xs={12} md={4}>
            <PokedexCard 
              id={pkm.name}
              startLoad={loadId === i}
              loaded={() => setLoadId(s => s + 1)}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {loadId === maximum && <VisibilityElement onVisible={() => setMaximum(s => s + 3)} />}
        </Col>
      </Row>
    </Container>
  );
};

export default PokedexPage;
