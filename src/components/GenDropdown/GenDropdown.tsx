import "./GenDropdown.scss";
import * as React from 'react'
import * as Hooks from 'helpers/hooks'
import * as Types from 'helpers/types'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "./sub-components/DropdownItem";
import DropdownMenu from "./sub-components/DropdownMenu";
import DropdownToggle from "./sub-components/DropdownToggle";

const { useState } = React
const { useGeneration } = Hooks 

const GenerationDropdown: React.FC = () => {
  const [show, setShow] = useState(false);
  const { generations, currentGen, setCurrentGen } = useGeneration();

  const handleChange = (gen: Types.Generation) => {
    setShow(false);
    setCurrentGen(gen);
  };

  if (!currentGen) return null;

  return (
    <Dropdown className="gen-dropdown">
      <Dropdown.Toggle as={DropdownToggle} gen={currentGen} />
      <Dropdown.Menu as={DropdownMenu} show={show}>
        {generations.map((gen) => (
          <Dropdown.Item
            key={gen.id}
            as={DropdownItem}
            gen={gen}
            onSelected={handleChange}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenerationDropdown;
