import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { RefObject } from "react";
import cardStyles from "styles/PokedexCard.module.scss";
import styles from "styles/PokedexCardLoading.module.scss";

interface iProps {
  cardRef?: RefObject<HTMLDivElement>;
}

const PokedexCardLoading: React.FC<iProps> = ({ cardRef }) => (
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

export default PokedexCardLoading;
