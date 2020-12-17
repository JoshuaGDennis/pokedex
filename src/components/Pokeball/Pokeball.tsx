import "./Pokeball.scss"
import React from "react";
interface iProps {
  className?: string
}

const Pokeball: React.FC<iProps> = ({ className }) => (
  <div className={`pokeball ${className || ''}`}>
    <div />
  </div>
)

export default Pokeball;
