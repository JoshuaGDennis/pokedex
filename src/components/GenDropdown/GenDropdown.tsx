import "./GenDropdown.scss";
import React, { useState } from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "./sub-components/DropdownItem";
import DropdownToggle from "./sub-components/DropdownToggle";
import { useGenerationContext } from 'context/GenerationContext'

interface iProps {
  onChange(): void
}

const GenDropdown: React.FC<iProps> = ({ onChange }) => {
  const [show, setShow] = useState(false)

  const gens = useGenerationContext()

  if(gens.status !== 'loaded') return null

  return (
    <Dropdown className="gen-dropdown">
      <Dropdown.Toggle as={DropdownToggle} gen={gens.current} />
      <Dropdown.Menu show={show}>
        <Dropdown.Header className="dropdown-menu__title">Generations</Dropdown.Header>
        <div className="dropdown-menu__inner">
          {gens.generations.map((gen) => (
            <Dropdown.Item
              key={gen.id}
              as={DropdownItem}
              gen={gen}
              onSelected={() => {
                setShow(false)
                if(gen.id !== gens.current.id) {
                  gens.updateCurrent(gen.id)
                  onChange()
                }
              }}
            />
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GenDropdown