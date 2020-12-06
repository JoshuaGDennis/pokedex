import React from "react";
import Image from "./Image";
import Pokeball from "./Pokeball";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { capitalise, useTheme } from "helpers";
import styles from "styles/PokemonCard.module.scss";

interface iProps {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
}

const PokemonShowCard: React.FC<iProps> = ({
  id,
  name,
  description,
  image,
  type,
}) => {
  const theme = useTheme();

  const cardClasses = [
    styles[theme === "light" ? "cardSplit" : "cardSplitDark"],
    `bg-${type}`,
  ].join(" ");

  return (
    <Card className={cardClasses}>
      <Card.Body>
        <Row>
          <Col>
            <p className={styles.cardLargeText}>{capitalise(name)}</p>
            <p className={styles.cardSmallText}>The {description}</p>
          </Col>
          <Col>
            <p className={`${styles.cardLargeText} text-right`}>#{id}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image className={styles.cardImage} src={image} noAnimate fluid />
            <Pokeball className={styles.cardPokeball} type={type} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PokemonShowCard;
