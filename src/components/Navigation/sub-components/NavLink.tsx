import React from "react";
import Image from "components/Image";
import { Link } from "react-router-dom";
import { PokemonFormResponse } from "helpers";

interface iProps {
  className: string;
  form: PokemonFormResponse;
}

const NavLink: React.FC<iProps> = ({ className, form }) => (
  <Link to={`/pokemon/${form.name}`} className={`nav-button ${className}`}>
    <Image src={form.image} fluid noAnimate />
  </Link>
);

export default NavLink;
