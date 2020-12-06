import Image from "./Image";
import Pokeball from "./Pokeball";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import React, { useEffect, useState } from "react";
import styles from "styles/PokemonCard.module.scss";
import {
  capitalise,
  PokemonAbilityResponse,
  PokemonResponse,
  SpeciesResponse,
  useApi,
  useTheme,
} from "helpers";

interface iProps {
  data: PokemonResponse;
}

const PokemonCard: React.FC<iProps> = ({ data }) => {
  const theme = useTheme();
  const { getAbility, getSpecies } = useApi();

  const [species, setSpecies] = useState<SpeciesResponse | null>(null);
  const [abilities, setAbilities] = useState<PokemonAbilityResponse[]>([]);

  useEffect(() => {
    getSpecies(data.name).then(setSpecies);
  }, [data.name, getSpecies]);

  useEffect(() => {
    Promise.all(data.abilities.map((ability) => getAbility(ability))).then(
      setAbilities
    );
  }, [data.abilities, getAbility]);

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
                  <p className={styles.cardSmallText}>
                    {species && `The ${species.genera}`}
                  </p>
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
                    <p>{species ? species.description : ""}</p>

                    <h4 className={styles.cardTabsContentHeading}>ABILITIES</h4>

                    {abilities && (
                      <Row>
                        {abilities.map(({ name, description }) => (
                          <Col key={name} className={styles.cardAbility}>
                            <h4>{capitalise(name)}</h4>
                            <p>{description}</p>
                          </Col>
                        ))}
                      </Row>
                    )}
                    <h4 className={styles.cardTabsContentHeading}>TRAINING</h4>
                    <Row>
                      <Col>
                        <p>Base Exp</p>
                      </Col>
                      <Col>
                        <p>{data.exp}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Base Happiness</p>
                      </Col>
                      <Col>
                        <p>{species && species.happiness}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Catch Rate</p>
                      </Col>
                      <Col>
                        <p>{species && species.captureRate}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Growth Rate</p>
                      </Col>
                      <Col>
                        <p>{species && species.growthRate}</p>
                      </Col>
                    </Row>
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
