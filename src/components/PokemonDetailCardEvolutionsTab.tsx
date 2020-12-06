import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import styles from "styles/PokemonCard.module.scss";

const PokemonDetailCardEvolutionsTab: React.FC = () => (
  <Tab.Content className={styles.cardTabsContent}>
    <Row>
      <Col>EVOLUTIONS</Col>
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardEvolutionsTab;
