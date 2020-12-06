import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import styles from "styles/PokemonCard.module.scss";

const PokemonDetailCardMovesTab: React.FC = () => (
  <Tab.Content className={styles.cardTabsContent}>
    <Row>
      <Col>MOVES</Col>
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardMovesTab;
