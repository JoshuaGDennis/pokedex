import * as React from 'react'
import * as helpers from 'helpers'
import Image from "components/Image";

const { forwardRef } = React
const { getPokemonSprite } = helpers

interface iProps {
  className: string;
  gen: helpers.GenerationResponse;
  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const DropdownToggle = forwardRef<HTMLDivElement, iProps>(
  ({ className, gen, onClick }, ref) => (
    <div
      ref={ref}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Image src={getPokemonSprite(gen.pokemon[0].id)} noAnimate />
      <Image src={getPokemonSprite(gen.pokemon[3].id)} noAnimate />
      <Image src={getPokemonSprite(gen.pokemon[6].id)} noAnimate />
    </div>
  )
);

export default DropdownToggle;
