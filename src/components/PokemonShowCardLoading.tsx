import React from "react";
import Pokeball from "./Pokeball";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { capitalise } from "helpers";
import styles from "styles/PokemonCard.module.scss";
import loadingStyles from "styles/PokedexCardLoading.module.scss";

const PokemonShowCardLoading: React.FC = () => (
  <Card className={`${styles.cardSplit} bg-steel`}>
    <Card.Body>
      <Row>
        <Col>
          <p className={`${loadingStyles.skeleton} ${styles.cardLargeText}`}>
            {capitalise("SOME NAME")}
          </p>
          <p className={`${loadingStyles.skeleton} ${styles.cardSmallText}`}>
            The description
          </p>
        </Col>
        <Col>
          <p
            className={`${loadingStyles.skeleton} ${styles.cardLargeText} text-right float-right`}
          >
            #000
          </p>
        </Col>
      </Row>
      <Pokeball className={styles.cardPokeballDefault} type="steel" />
    </Card.Body>
  </Card>
);

export default PokemonShowCardLoading;
