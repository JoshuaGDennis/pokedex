import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API_List } from "helpers/types";
import { PokedexCard } from "components/Card";
import GenDropdown from "components/GenDropdown";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import VisibleElement from "components/VisibleElement";
import { useGenerationContext } from "context/GenerationContext";

const PokedexPage: React.FC = () => {
  const generations = useGenerationContext();

  const [loadID, setLoadID] = useState(0);
  const [maxItems, setMaxItems] = useState(6);
  const [items, setItems] = useState<API_List>([]);

  useEffect(() => {
    if (generations.status === "loaded") {
      setItems(generations.current.pokemon.slice(0, maxItems));
    }
  }, [generations, maxItems]);

  return (
    <Container className="wide">
      <Row>
        <Col>
          <GenDropdown onChange={() => setLoadID(0)} />
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
