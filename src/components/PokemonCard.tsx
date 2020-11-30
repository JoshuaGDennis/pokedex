import Image from "./Image";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import { capitalise } from "helpers/strings";
import { PokemonResponse } from "helpers/types";
import styles from "styles/PokemonCard.module.scss";

interface iPokemonCardProps {
  data: PokemonResponse;
}

const LeftCard: React.FC<iPokemonCardProps> = ({ data }) => (
  <Card className={`${styles.leftCard} bg-${data.types[0]}`}>
    <Card.Body>
      <Row>
        <Col>
          <p>#{data.id}</p>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col>
          <Image className={styles.image} src={data.image} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-md-center">{capitalise(data.name)}</h1>
        </Col>
      </Row>
      <Row md={6} className="justify-content-md-center">
        {data.types.map((type, i) => (
          <Col key={type}>
            <p
              className={`${styles.type} bg-${type}${
                i === 0 ? "--lighter" : ""
              } bs-${type}--darker`}
            >
              {capitalise(type)}
            </p>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

const RightCard: React.FC<iPokemonCardProps> = ({ data }) => {
  const [active, setActive] = useState<string>("profile");

  return (
    <Card className={styles.rightCard}>
      <Card.Body>
        <Row>
          <Col>
            <Tabs
              activeKey={active}
              className={styles.tabs}
              onSelect={(k: any) => setActive(k)}
            >
              <Tab
                eventKey="profile"
                title="PROFILE"
                tabClassName={`${styles.tab} bg-${data.types[0]}${
                  active === "" ? "--darker" : "--lighter"
                }`}
              >
                <Tab.Pane className={styles.pane}>SOME STUFF</Tab.Pane>
              </Tab>
              <Tab
                eventKey="moves"
                title="MOVES"
                tabClassName={`${styles.tab} bg-${data.types[0]}${
                  active === "" ? "--darker" : "--lighter"
                }`}
              >
                <Tab.Pane className={styles.pane}>SOME MOVES</Tab.Pane>
              </Tab>
              <Tab
                eventKey="evolutions"
                title="EVOLUTIONS"
                tabClassName={`${styles.tab} bg-${data.types[0]}${
                  active === "" ? "--darker" : "--lighter"
                }`}
              >
                <Tab.Pane className={styles.pane}>SOME EVOLUTIONS</Tab.Pane>
              </Tab>
              <Tab
                eventKey="weaknesses"
                title="WEAKNESSES"
                tabClassName={`${styles.tab} bg-${data.types[0]}${
                  active === "" ? "--darker" : "--lighter"
                }`}
              >
                <Tab.Pane className={styles.pane}>SOME WEAKNESSES</Tab.Pane>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const PokemonCard: React.FC<iPokemonCardProps> = ({ data }) => (
  <Card className={styles.card}>
    <Card.Body className="p-0 h-100">
      <Row className="m-0 h-100">
        <Col className="p-0">
          <LeftCard data={data} />
        </Col>

        <Col className="p-0">
          <RightCard data={data} />
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default PokemonCard;
