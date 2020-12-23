import Card from "../Card";
import * as React from "react";
import "../styles/PokemonCard.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import * as Types from 'helpers/types';
import Tabs from "react-bootstrap/Tabs";
import * as Strings from 'helpers/strings';
import Pokeball from "components/Pokeball";
import { EvolutionsTab, ProfileTab, StatsTab } from "components/Tabs";

const { capitalise } = Strings

interface iProps {
  data: Types.Pokemon;
  species: Types.Species;
}

const PokemonCard: React.FC<iProps> = ({ data, species }) => (
  <Card className="pokemon-card">
    <Row className="h-100">
      <Col className="pr-0">
        <Card className={`pokemon-card__show-card bg-${data.types[0]}`}>
          <Card.Body>
            <Row>
              <Col>
                <h1>{capitalise(data.name)}</h1>
                <h2>The {species.genera}</h2>
              </Col>
              <Col>
                <h1 className="text-right">#{data.id}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src={data.image} noAnimate fluid />
                <Pokeball className={`type-${data.types[0]}`} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="pl-0">
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
