import {
  PokemonAbilityResponse,
  PokemonTypeResponse,
  PokemonResponse,
  SpeciesResponse,
  useTheme,
} from "helpers";
import Tab from "react-bootstrap/Tab";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import styles from "styles/PokemonCard.module.scss";
import PokemonDetailCardStatsTab from "./PokemonDetailCardStatsTab";
import PokemonDetailCardProfileTab from "./PokemonDetailCardProfileTab";
import PokemonDetailCardEvolutionsTab from "./PokemonDetailCardEvolutionsTab";
interface iProps {
  data: PokemonResponse;
  types: PokemonTypeResponse[];
  abilities: PokemonAbilityResponse[];
  species: SpeciesResponse;
}

const PokemonDetailCard: React.FC<iProps> = ({
  data,
  types,
  abilities,
  species,
}) =>  {
  const theme = useTheme()
  const [ key, setKey ] = useState<string | null>('profile')

  return (
    <Card className={styles[theme === "light" ? "cardSplit" : "cardSplitDark"]}>
      <Card.Body>
        <Tabs 
          activeKey={key} 
          onSelect={(k) => setKey(k)} 
          className={`${styles.cardTabs} ${styles[`cardTabsColor${types[0].name}`]} justify-content-center mb-4`}
        >
          <Tab eventKey="profile" title="PROFILE" tabClassName={key === 'profile' ? styles.cardTabsActive : ''}>
            <PokemonDetailCardProfileTab
              description={species.description}
              abilities={abilities}
              exp={data.exp}
              happiness={species.happiness}
              captureRate={species.captureRate}
              growthRate={species.growthRate}
              height={data.height}
              weight={data.weight}
            />
          </Tab>
          <Tab eventKey="stats" title="STATS" tabClassName={key === 'stats' ? styles.cardTabsActive : ''}>
            <PokemonDetailCardStatsTab stats={data.stats} types={types} />
          </Tab>
          <Tab eventKey="evolutions" title="EVOLUTIONS" tabClassName={key === 'evolutions' ? styles.cardTabsActive : ''}>
            <PokemonDetailCardEvolutionsTab chainID={species.evolutionChainId} type={data.types[0]} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default PokemonDetailCard;
