import * as React from 'react'
import * as API from 'helpers/api';
import "../styles/ProfileTab.scss";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Types from 'helpers/types';
import * as Strings from 'helpers/strings'

const { capitalise } = Strings
const { getPokemonAbility } = API
const { useEffect, useState } = React

interface iProps {
  data: Types.Pokemon;
  species: Types.Species;
}

const ProfileTab: React.FC<iProps> = ({ data, species }) => {
  const [abilities, setAbilities] = useState<Types.Ability[]>([]);

  useEffect(() => {
    Promise.all(data.abilities.map((name) => getPokemonAbility(name))).then(
      setAbilities
    );
  }, [data.abilities]);

  return (
    <Tab.Content className="profile-tab">
      <p className="mb-4">{species.description}</p>
      <p>Height: {data.height}m</p>
      <p>Weight: {data.weight}kg</p>

      <div className="profile-section">
        <h1>ABILITIES</h1>
        <Row>
          {abilities.map(({ name, description }) => (
            <Col key={name} className="profile-ability-section">
              <h1>{capitalise(name)}</h1>
              <p>{description}</p>
            </Col>
          ))}
        </Row>
      </div>

      <div className="profile-section">
        <h1>TRAINING</h1>
        <Row>
          <Col>
            <p>Base Exp:</p>
          </Col>
          <Col>
            <p>{data.exp}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Base Happiness:</p>
          </Col>
          <Col>
            <p>{species.happiness}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Catch Rate:</p>
          </Col>
          <Col>
            <p>{species.captureRate}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Growth Rate:</p>
          </Col>
          <Col>
            <p>{species.growthRate}</p>
          </Col>
        </Row>
      </div>
    </Tab.Content>
  );
};
export default ProfileTab;
