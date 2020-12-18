import "./NavButtons.scss";
import Image from "components/Image";
import { Link } from "react-router-dom";
import { getPokemonForm } from "helpers/api";
import React, { useEffect, useState } from "react";
import { PokemonFormResponse, useGen } from "helpers";

interface iProps {
  id: number;
  className?: string;
}

const NavButton: React.FC<iProps> = ({ id, className }) => {
  const { currentGen } = useGen();
  const [pokemon, setPokemon] = useState<PokemonFormResponse | null>(null);

  useEffect(() => {
    getPokemonForm(id).then(setPokemon);
  }, [id]);

  if (!currentGen || !pokemon) return null;

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className={`nav-button ${className || ""}`}
    >
      <Image src={pokemon.image} fluid noAnimate />
    </Link>
  );
};

export default NavButton;
