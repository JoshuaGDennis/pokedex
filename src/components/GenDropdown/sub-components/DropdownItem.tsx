import * as React from 'react'
import * as helpers from "helpers";
import Image from "components/Image";

const { forwardRef } = React
const { getPokemonSprite } = helpers

interface iProps {
  gen: helpers.GenerationResponse;
  className: string;
  onSelected(gen: helpers.GenerationResponse): void;
}

const DropdownItem = forwardRef<HTMLDivElement, iProps>(
  ({ gen, className, onSelected }, ref) => (
    <div className={className} ref={ref} onClick={() => onSelected(gen)}>
      <p>Generation {gen.id}</p>
      <div className="dropdown-item__images">
        <Image src={getPokemonSprite(gen.pokemon[0].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[3].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[6].id)} noAnimate />
      </div>
    </div>
  )
);

export default DropdownItem;
