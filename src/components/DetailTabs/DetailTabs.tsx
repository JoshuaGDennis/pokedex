import React from "react";
import "./styles/DetailTabs.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StatsTab from "./sub-components/StatsTab";
import ProfileTab from "./sub-components/ProfileTab";
import { PokemonResponse, SpeciesResponse } from "helpers";
import EvolutionsTab from "./sub-components/EvolutionsTab";

interface iProps {
  data: PokemonResponse;
  species: SpeciesResponse;
}

const DetailTabs: React.FC<iProps> = ({ data, species }) => (
  <Tabs className="detail-tabs">
    <Tab
      eventKey="profile"
      title="PROFILE"
      tabClassName={`color-${data.types[0]}`}
    >
      <ProfileTab data={data} species={species} />
    </Tab>

    <Tab eventKey="stats" title="STATS" tabClassName={`color-${data.types[0]}`}>
      <StatsTab stats={data.stats} types={data.types} />
    </Tab>

    <Tab
      eventKey="evolutions"
      title="EVOLUTIONS"
      tabClassName={`color-${data.types[0]}`}
    >
      <EvolutionsTab id={species.evolutionChainId} type={data.types[0]} />
    </Tab>
  </Tabs>
);

export default DetailTabs;
