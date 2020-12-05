import React from "react";
import Image from "./Image";
import Pokeball from "./Pokeball";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import styles from "styles/PokemonCard.module.scss";
import { capitalise, PokemonResponse, useTheme } from "helpers";

interface iProps {
  data: PokemonResponse;
}

const PokemonCard: React.FC<iProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <Card className={styles.card}>
      <Row className="h-100">
        <Col className="pr-0">
          <Card
            className={`${
              styles[`${theme === "light" ? "cardSplit" : "cardSplitDark"}`]
            } bg-${data.types[0]}`}
          >
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
              <Row className="h-100">
                <Col>
                  <Image
                    className={styles.cardImage}
                    src={data.image}
                    noAnimate
                    fluid
                  />
                  <Pokeball
                    className={styles.cardPokeball}
                    type={data.types[0]}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="pl-0">
          <Card
            className={`${
              styles[`${theme === "light" ? "cardSplit" : "cardSplitDark"}`]
            }`}
          >
            <Card.Body>
              <Tabs className={`${styles.cardTabs} justify-content-center`}>
                <Tab eventKey="profile" title="PROFILE">
                  <Tab.Content className={styles.cardTabsContent}>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor.
                    </p>

                    <h4 className={styles.cardTabsContentHeading}>ABILITIES</h4>
                    <h4 className={styles.cardTabsContentHeading}>TRAINING</h4>
                  </Tab.Content>
                </Tab>
                <Tab eventKey="stats" title="STATS">
                  <Tab.Content className={styles.cardTabsContent}>
                    STAT STUFF
                  </Tab.Content>
                </Tab>
                <Tab eventKey="evolutions" title="EVOLUTIONS">
                  <Tab.Content className={styles.cardTabsContent}>
                    EVOLUTION STUFF
                  </Tab.Content>
                </Tab>
                <Tab eventKey="moves" title="MOVES">
                  <Tab.Content className={styles.cardTabsContent}>
                    MOVE STUFF
                  </Tab.Content>
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
