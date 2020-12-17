import "./GenerationDropdown.scss";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { GenerationResponse, useGen } from "helpers";
import DropdownItem from "./sub-components/DropdownItem";
import DropdownMenu from "./sub-components/DropdownMenu";
import DropdownToggle from "./sub-components/DropdownToggle";

const GenerationDropdown: React.FC = () => {
  const [show, setShow] = useState(false);
  const { generations, currentGen, setCurrentGen } = useGen();

  const handleChange = (gen: GenerationResponse) => {
    setShow(false);
    setCurrentGen(gen);
  };

  if (!currentGen) return null;

  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownToggle} gen={currentGen} />
      <Dropdown.Menu as={DropdownMenu} show={show}>
        {generations.map((gen) => (
          <Dropdown.Item
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
