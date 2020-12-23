import * as React from 'react'
import Image from "components/Image";
import * as Types from 'helpers/types';
import * as Strings from 'helpers/strings';

const { forwardRef } = React
const { getPokemonSprite } = Strings

interface iProps {
  className: string;
  gen: Types.Generation;
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
