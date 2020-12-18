import React from "react";
import "./styles/DetailTabs.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { PokemonResponse, SpeciesResponse } from "helpers";
import ProfileTab from "./sub-components/ProfileTab";

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
      <ProfileTab data={data} species={species} abilities={[]} />
    </Tab>

    <Tab eventKey="stats" title="STATS" tabClassName={`color-${data.types[0]}`}>
      STUFF HERE
    </Tab>

    <Tab
      eventKey="evolutions"
      title="EVOLUTIONS"
      tabClassName={`color-${data.types[0]}`}
    >
      STUFF HERE
    </Tab>
  </Tabs>
);

export default DetailTabs;
