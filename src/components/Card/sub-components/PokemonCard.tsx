import React from "react";
import Card from "../Card";
import "../styles/PokemonCard.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Pokeball from "components/Pokeball";
import { capitalise, PokemonResponse, SpeciesResponse } from "helpers";
import { EvolutionsTab, ProfileTab, StatsTab } from "components/Tabs";

interface iProps {
  data: PokemonResponse;
  species: SpeciesResponse;
}

const PokemonCard: React.FC<iProps> = ({ data, species }) => (
  <Card className="pokemon-card">
    <Row>
      <Col>
        <Card className={`pokemon-card__show-card bg-${data.types[0]}`}>
          <Card.Body>
            <Row>
              <Col>
                <h1>{capitalise(data.name)}</h1>
                <h2>The {species.description}</h2>
              </Col>
              <Col>
                <h1 className="text-right">#{data.id}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src={data.image} noAnimate fluid />
                <Pokeball />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="pokemon-card__detail-card">
          <Card.Body>
            <Tabs>
              <Tab
                eventKey="profile"
                title="PROFILE"
                tabClassName={`color-${data.types[0]}`}
              >
                <ProfileTab data={data} species={species} />
              </Tab>
              <Tab
                eventKey="stats"
                title="STATS"
                tabClassName={`color-${data.types[0]}`}
              >
                <StatsTab stats={data.stats} types={data.types} />
              </Tab>
              <Tab
                eventKey="evolutions"
                title="EVOLUTIONS"
                tabClassName={`color-${data.types[0]}`}
              >
                <EvolutionsTab
                  id={species.evolutionChainId}
                  type={data.types[0]}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Card>
);

export default PokemonCard;
