import Dropdown from "react-bootstrap/Dropdown";
import React, { forwardRef, useEffect, useState } from "react";
import { getAllGenerations } from "helpers/api";

interface iGenMenuProps {
  children: React.ReactNode;
  className: string;
}

interface iGenDropdownProps {
  onChange: Function;
}

const GenerationMenu = forwardRef<HTMLDivElement, iGenMenuProps>(
  ({ children, className }, ref) => {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }
);

const GenerationDropdown: React.FC<iGenDropdownProps> = ({ onChange }) => {
  const [genIds, setGenIds] = useState<number[]>([]);

  useEffect(() => {
    getAllGenerations().then(setGenIds);
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">Generations</Dropdown.Toggle>

      <Dropdown.Menu as={GenerationMenu}>
        {genIds.map((id) => (
          <Dropdown.Item id={id} onClick={() => onChange(id)}>
            Generation {id}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenerationDropdown;
