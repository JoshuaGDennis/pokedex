import Image from "./Image";
import React, { forwardRef } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "styles/GenerationDropdown.module.scss";
import { GenerationResponse, getPokemonSprite, useApi } from "helpers";

interface iItemProps {
  gen: GenerationResponse;
  className: string;
  onSelected(gen: GenerationResponse): void;
}

const GenItem = forwardRef<HTMLDivElement, iItemProps>(
  ({ gen, className, onSelected }, ref) => (
    <div
      className={`${className} ${styles.item}`}
      ref={ref}
      onClick={() => onSelected(gen)}
    >
      {gen.versions[0]}
      <div className={styles.sprites}>
        <Image src={getPokemonSprite(gen.pokemon[0].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[3].id)} noAnimate />
        <Image src={getPokemonSprite(gen.pokemon[6].id)} noAnimate />
      </div>
    </div>
  )
);

const GenerationDropdown: React.FC = () => {
  const { generations, currentGen, setCurrentGen, isLoading } = useApi();

  if (!currentGen || isLoading) {
    return (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">
        {currentGen.versions[0]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {generations.map((gen) => (
          <Dropdown.Item
            as={GenItem}
            gen={gen}
            key={gen.id}
            onSelected={setCurrentGen}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenerationDropdown;
