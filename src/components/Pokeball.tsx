import React from "react";
import { useTheme } from "helpers";
import styles from "styles/Pokeball.module.scss";

interface iProps {
  type: string;
  className?: string;
}

const Pokeball: React.FC<iProps> = ({ type, className }) => {
  const theme = useTheme();

  const classes = [
    styles.pokeball,
    styles[`pokeball${theme === "light" ? type : `${type}Dark`}`],
    className || "",
  ].join(" ");

  return (
    <div className={classes}>
      <div />
    </div>
  );
};

export default Pokeball;
