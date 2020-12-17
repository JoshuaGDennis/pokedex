import React from "react";
import Pokeball from "./Pokeball";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { capitalise, useTheme } from "helpers";
import styles from "styles/PokemonCard.module.scss";
import loadingStyles from "styles/PokedexCardLoading.module.scss";

const PokemonShowCardLoading: React.FC = () => {

  const theme = useTheme()

  return (
    <Card className={`${theme === 'light' ? `${styles.cardSplit} bg-steel}` : styles.cardSplitDark}`}>
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
        <Pokeball className={styles.cardPokeballDefault}/>
      </Card.Body>
    </Card>
  );
}

export default PokemonShowCardLoading;
