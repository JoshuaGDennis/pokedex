import * as React from 'react'
import Image from "components/Image";
import * as Types from 'helpers/types';
import * as Strings from "helpers/strings";

const { forwardRef } = React
const { getPokemonSprite } = Strings

interface iProps {
  className: string;
  gen: Types.Generation;
  onSelected(gen: Types.Generation): void;
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
