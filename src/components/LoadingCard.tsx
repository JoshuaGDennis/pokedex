import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { RefObject } from "react";
import styles from "styles/LoadingCard.module.scss";
import cardStyles from "styles/PokedexCard.module.scss";

interface iLoadingCardProps {
  cardRef?: RefObject<HTMLDivElement>;
}

const LoadingCard: React.FC<iLoadingCardProps> = ({ cardRef }) => (
  <Card className={cardStyles.card} ref={cardRef}>
    <Card.Body className={cardStyles.body}>
      <Row>
        <Col>
          <p className={styles.skeleton}>#ID</p>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer className={cardStyles.footer}>
      <Row>
        <Col>
          <p className={`${styles.skeleton} ${styles.centered}`}>Name</p>
        </Col>
      </Row>
      <Row className={cardStyles.types}>
        <Col>
          <p className={`${styles.skeleton} ${styles.centered}`}>Type 1</p>
        </Col>
        <Col>
          <p className={`${styles.skeleton} ${styles.centered}`}>Type 2</p>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default LoadingCard;
