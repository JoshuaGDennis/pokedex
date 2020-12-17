import Image from "components/Image";
import React, { forwardRef } from "react";
import { GenerationResponse, getPokemonSprite } from "helpers";

interface iProps {
  gen: GenerationResponse;
  className: string;
  onSelected(gen: GenerationResponse): void;
}

const DropdownItem = forwardRef<HTMLDivElement, iProps>(
  ({ gen, className, onSelected }, ref) => (
    <div className={className} ref={ref} onClick={() => onSelected(gen)}>
      <div>
        <Image src={getPokemonSprite(gen.pokemon[0].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[3].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[6].id)} noAnimate />
      </div>
    </div>
  )
);

export default DropdownItem;
