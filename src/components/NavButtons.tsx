import Image from "./Image";
import React from "react";
import { Link } from "react-router-dom";
import PromiseLoader from "./PromiseLoader";
import { getPokemonForm } from "helpers/api";
import styles from "styles/NavButtons.module.scss";
import { PokemonFormResponse, useGen, useTheme } from "helpers";

interface iProps {
  currentID: number;
}

const NavButtons: React.FC<iProps> = ({ currentID }) => {
  const { currentGen } = useGen();
  const theme = useTheme()

  if (!currentGen) return null;

  return (
    <PromiseLoader
      promises={[
        getPokemonForm(
          currentID === 1 ? currentGen.pokemon.length : currentID - 1
        ),
        getPokemonForm(
          currentID === currentGen.pokemon.length ? 1 : currentID + 1
        ),
      ]}
      render={([previous, next]: PokemonFormResponse[]) => (
        <>
          {previous && (
            <Link
              to={`/pokemon/${previous.name}`}
              className={`${styles.link} ${theme === 'dark' ? styles.linkDark : ''}   ${styles.left}`}
            >
              <Image src={previous.image} fluid noAnimate />
            </Link>
          )}

          {next && (
            <Link
              to={`/pokemon/${next.name}`}
              className={`${styles.link} ${theme === 'dark' ? styles.linkDark : ''} ${styles.right}`}
            >
              <Image src={next.image} fluid noAnimate />
            </Link>
          )}
        </>
      )}
    />
  );
};

export default NavButtons;
