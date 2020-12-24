import "./GenDropdown.scss";
import * as React from 'react'
import * as Hooks from 'helpers/hooks'
import * as Types from 'helpers/types'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "./sub-components/DropdownItem";
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
      <Dropdown.Menu show={show}>
        <Dropdown.Header className="dropdown-menu__title">Generations</Dropdown.Header>
        <div className="dropdown-menu__inner">
          {generations.map((gen) => (
            <Dropdown.Item
              key={gen.id}
              as={DropdownItem}
              gen={gen}
              onSelected={handleChange}
            />
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenerationDropdown;
