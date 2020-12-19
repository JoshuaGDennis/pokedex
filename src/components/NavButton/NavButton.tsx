import React from "react";
import "./NavButton.scss";
import Image from "components/Image";
import { Link } from "react-router-dom";
import { PokemonFormResponse } from "helpers";

interface iProps {
  className?: string;
  children?: React.ReactNode;
  form?: PokemonFormResponse;
  to: string;
}

const NavButton: React.FC<iProps> = ({ className, children, form, to }) => (
  <Link to={to} className={`nav-button ${className || ""}`}>
    {form && <Image src={form.image} fluid noAnimate />}
    {children}
  </Link>
);

export default NavButton;
