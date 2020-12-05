import React from "react";
import Image from "./Image";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import styles from "styles/PokemonCard.module.scss";
import { capitalise, PokemonResponse } from "helpers";

interface iProps {
  data: PokemonResponse;
}

const PokemonCard: React.FC<iProps> = ({ data }) => {
  return (
    <Card className={styles.card}>
      <Row>
        <Col className="pr-0">
          {/* LEFT CARD */}
          <Card className={`${styles.cardSplit} bg-${data.types[0]}`}>
            <Card.Body>
              <Row>
                <Col>
                  <p className={styles.cardLargeText}>
                    {capitalise(data.name)}
                  </p>
                  <p>The something pokemon</p>
                </Col>
                <Col>
                  <p className={`${styles.cardLargeText} text-right`}>
                    #{data.id}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Image
                    className={styles.cardImage}
                    src={data.image}
                    noAnimate
                    fluid
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="pl-0">
          {/* RIGHT CARD */}
          <Card className={styles.cardSplit}>
            <Card.Body>
              <Tabs className={`${styles.cardTabs} justify-content-center`}>
                <Tab eventKey="profile" title="PROFILE">
                  <Tab.Content className={styles.cardTabsContent}>
                    PROFILE STUFF
                  </Tab.Content>
                </Tab>
                <Tab eventKey="stats" title="STATS">
                  STAT STUFF
                </Tab>
                <Tab eventKey="evolutions" title="EVOLUTIONS">
                  EVOLUTION STUFF
                </Tab>
                <Tab eventKey="moves" title="MOVES">
                  MOVE STUFF
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonCard;
