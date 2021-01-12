import React from 'react'
import "./Navigation.scss";
import Image from "components/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pokeball from "components/Pokeball";
import { Service, Form } from 'helpers/types'

interface iNavigationProps {
  previousPokemon: Service<Form>
  nextPokemon: Service<Form>
  color: string
}

interface iNavLinkProps {
  form: Service<Form>
  position: string
}

const NavLink : React.FC<iNavLinkProps> = ({ form, position }) => (
  <div className={`nav-button ${position} ${form.status}`}>
    {form.status === 'loaded' && (
      <Link to={`/pokemon/${form.payload.name}`}>
        <Image src={form.payload.image} fluid noAnimate />
      </Link>
    )}
  </div>
)

const Navigation: React.FC<iNavigationProps> = ({ previousPokemon, nextPokemon, color }) => (
  <Row>
    <Col>
      <NavLink form={previousPokemon} position="left" />
    </Col>
    <Link to="/pokedex">
      <Pokeball className={`transparent-${color}`} />
    </Link>
    <Col>
      <NavLink form={nextPokemon} position="right" />
    </Col>
  </Row>
)

export default Navigation
