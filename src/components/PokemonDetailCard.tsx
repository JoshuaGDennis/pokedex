import {
  PokemonAbilityResponse,
  PokemonResponse,
  PokemonTypeResponse,
  SpeciesResponse,
  useTheme,
} from "helpers";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import styles from "styles/PokemonCard.module.scss";
import PokemonDetailCardStatsTab from "./PokemonDetailCardStatsTab";
import PokemonDetailCardMovesTab from "./PokemonDetailCardMovesTab";
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
}) => {
  const theme = useTheme();

  const tabsClasses = [styles.cardTabs, "justify-content-center mb-4"].join(
    " "
  );

  return (
    <Card
      className={styles[`${theme === "light" ? "cardSplit" : "cardSplitDark"}`]}
    >
      <Card.Body>
        <Tabs className={tabsClasses}>
          <Tab eventKey="profile" title="PROFILE">
            <PokemonDetailCardProfileTab
              description={species.description}
              abilities={abilities}
              exp={data.exp}
              happiness={species.happiness}
              captureRate={species.captureRate}
              growthRate={species.growthRate}
            />
          </Tab>
          <Tab eventKey="stats" title="STATS">
            <PokemonDetailCardStatsTab stats={data.stats} types={types} />
          </Tab>
          <Tab eventKey="evolutions" title="EVOLUTIONS">
            <PokemonDetailCardEvolutionsTab />
          </Tab>
          <Tab eventKey="moves" title="MOVES">
            <PokemonDetailCardMovesTab />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default PokemonDetailCard;
