import "./Pokeball.scss";
import * as React from "react";

interface iProps {
  className?: string;
}

const Pokeball: React.FC<iProps> = ({ className }) => (
  <div className={`pokeball ${className || ""}`}>
    <div />
  </div>
);

export default Pokeball;
