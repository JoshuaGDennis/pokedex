import {
  PokemonAbilityResponse,
  PokemonTypeResponse,
  PokemonResponse,
  SpeciesResponse,
} from "helpers";
import React from "react";
import Tab from "react-bootstrap/Tab";
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
}) =>  (
  <Card className={styles.cardSplit}>
    <Card.Body>
      <Tabs className={`${styles.cardTabs} justify-content-center mb-4`}>
        <Tab eventKey="profile" title="PROFILE">
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
        <Tab eventKey="stats" title="STATS">
          <PokemonDetailCardStatsTab stats={data.stats} types={types} />
        </Tab>
        <Tab eventKey="evolutions" title="EVOLUTIONS">
          <PokemonDetailCardEvolutionsTab chainID={species.evolutionChainId} type={data.types[0]} />
        </Tab>
      </Tabs>
    </Card.Body>
  </Card>
);

export default PokemonDetailCard;
