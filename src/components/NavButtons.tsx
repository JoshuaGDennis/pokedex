import Image from "./Image";
import { Link } from "react-router-dom";
import styles from "styles/NavButtons.module.scss";
import React, { useEffect, useState } from "react";
import { PokemonFormResponse, useApi } from "helpers";

interface iProps {
  currentID: number;
}

const NavButtons: React.FC<iProps> = ({ currentID }) => {
  const [previousForm, setPreviousForm] = useState<PokemonFormResponse | null>(
    null
  );
  const [nextForm, setNextForm] = useState<PokemonFormResponse | null>(null);

  const { currentGen, getForm } = useApi();

  console.log(previousForm, nextForm);

  useEffect(() => {
    if (currentGen) {
      if (!previousForm) {
        getForm(
          currentID === 1 ? currentGen.pokemon.length : currentID - 1
        ).then(setPreviousForm);
      }
      if (!nextForm) {
        getForm(
          currentID === currentGen.pokemon.length ? 1 : currentID + 1
        ).then(setNextForm);
      }
    }
  }, [currentGen, currentID, previousForm, nextForm, getForm]);

  return (
    <>
      {previousForm && (
        <Link
          to={`/pokemon/${previousForm.name}`}
          className={`${styles.link} ${styles.left}`}
        >
          <Image src={previousForm.image} fluid noAnimate />
        </Link>
      )}

      {nextForm && (
        <Link
          to={`/pokemon/${nextForm.name}`}
          className={`${styles.link} ${styles.right}`}
        >
          <Image src={nextForm.image} fluid noAnimate />
        </Link>
      )}
    </>
  );
};

export default NavButtons;
