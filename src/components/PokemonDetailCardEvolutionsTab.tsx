import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { capitalise } from 'helpers/strings'
import { getPokemonEvolutions } from "helpers/api";
import styles from "styles/PokemonCard.module.scss";
import PromiseLoader from 'components/PromiseLoader';
import { PokemonEvolutionResponse } from 'helpers/types';

interface iProps {
  chainID: number
}

const PokemonDetailCardEvolutionsTab: React.FC<iProps> = ({ chainID }) => (
  <Tab.Content className={styles.cardTabsContent}>
    <Row>
      <PromiseLoader
        promises={[getPokemonEvolutions(chainID)]}
        render={([ evolutions ]: [PokemonEvolutionResponse]) => (
          <Col>
            {evolutions.pokemon.map(pkm => (
              <p key={pkm.name}>{capitalise(pkm.name)} LVL: {pkm.level}</p>
            ))}
          </Col>
        )}
      />
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardEvolutionsTab;
