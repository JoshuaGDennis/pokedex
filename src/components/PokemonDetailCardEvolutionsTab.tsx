import React from "react";
import Image from 'components/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import { Link } from 'react-router-dom'
import { getPokemonEvolutions } from "helpers/api";
import styles from "styles/PokemonCard.module.scss";
import PromiseLoader from 'components/PromiseLoader';
import { PokemonEvolutionResponse } from 'helpers/types';
import { capitalise, getPokemonSprite } from 'helpers/strings'

interface iProps {
  chainID: number
  type: string
}

const PokemonDetailCardEvolutionsTab: React.FC<iProps> = ({ chainID, type }) => (
  <Tab.Content className={styles.cardTabsContent}>
    <Row>
      <PromiseLoader
        promises={[getPokemonEvolutions(chainID)]}
        render={([ evolutions ]: [PokemonEvolutionResponse]) => (
          <Col>
            {evolutions.pokemon.map(pkm => (
              <Link key={pkm.name} className={styles.evolution} to={`/pokemon/${pkm.name}`}>
                <Image className={`bg-${type}`} src={getPokemonSprite(pkm.id)} fluid noAnimate />
                <p className={styles.evolutionName}>{capitalise(pkm.name)}</p>
                <p className={styles.evolutionLevel}>Level: {pkm.level}</p>
              </Link>
            ))}
          </Col>
        )}
      />
    </Row>
  </Tab.Content>
);

export default PokemonDetailCardEvolutionsTab;
