import * as React from 'react';
import * as API from 'helpers/api';
import Image from "components/Image";
import "../styles/EvolutionsTab.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import * as Types from 'helpers/types';
import { Link } from "react-router-dom";
import * as Strings from 'helpers/strings';

const { getPokemonEvolutions } = API
const { useEffect, useState } = React
const { capitalise, getPokemonSprite } = Strings

interface iProps {
  id: number;
  type: string;
}

const EvolutionsTab: React.FC<iProps> = ({ id, type }) => {
  const [evolutions, setEvolutions] = useState<Types.Evolution | null>(
    null
  );

  useEffect(() => {
    getPokemonEvolutions(id).then(setEvolutions);
  }, [id]);

  if (!evolutions) return null;

  return (
    <Tab.Content className="evolutions-tab">
      <Row>
        <Col>
          {evolutions.pokemon.map((pkm) => (
            <Link
              key={pkm.name}
              className="evolution-item"
              to={`/pokemon/${pkm.name}`}
            >
              <Image
                className={`bg-${type}`}
                src={getPokemonSprite(pkm.id)}
                fluid
                noAnimate
              />
              <p className="evolution-item__name">{capitalise(pkm.name)}</p>
              <p className="evolution-item__level">Level: {pkm.level}</p>
            </Link>
          ))}
        </Col>
      </Row>
    </Tab.Content>
  );
};

export default EvolutionsTab;
