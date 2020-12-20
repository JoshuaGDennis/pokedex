import "./Navigation.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pokeball from "components/Pokeball";
import { getPokemonForm } from "helpers/api";
import { PokemonFormResponse } from "helpers";
import NavLink from "./sub-components/NavLink";
import React, { useEffect, useState } from "react";

interface iProps {
  previousID: number;
  nextID: number;
  type: string;
}

const Navigation: React.FC<iProps> = ({ previousID, nextID, type }) => {
  const [previous, setPrevious] = useState<PokemonFormResponse | null>(null);
  const [next, setNext] = useState<PokemonFormResponse | null>(null);

  useEffect(() => {
    Promise.all([getPokemonForm(previousID), getPokemonForm(nextID)]).then(
      ([p, n]) => {
        setPrevious(p);
        setNext(n);
      }
    );
  }, [previousID, nextID]);

  return (
    <Row>
      <Col>
        {previous ? (
          <NavLink className="left" form={previous} />
        ) : (
          <div className="nav-button left" />
        )}
      </Col>
      <Link to="/pokedex">
        <Pokeball className={`transparent-${type}`} />
      </Link>
      <Col>
        {next ? (
          <NavLink className="right" form={next} />
        ) : (
          <div className="nav-button right" />
        )}
      </Col>
    </Row>
  );
};

export default Navigation;
