import Image from './Image'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'
import styles from 'styles/GenerationDropdown.module.scss'
import React, { forwardRef, useEffect, useState } from 'react'
import { GenerationResponse, getPokemonSprite, useApi } from 'helpers'

interface iDropdownProps {
  onChange(gen: GenerationResponse): void
}

interface iItemProps {
  gen: GenerationResponse
  className: string
  onSelected(gen: GenerationResponse): void
}

const GenItem = forwardRef<HTMLDivElement, iItemProps>(({ gen, className, onSelected }, ref) => (
  <div className={`${className} ${styles.item}`} ref={ref} onClick={() => onSelected(gen)}>
    {gen.versions[0]}
    <div className={styles.sprites}>
      <Image src={getPokemonSprite(gen.pokemon[0].id)} noAnimate/>
      <Image src={getPokemonSprite(gen.pokemon[3].id)} noAnimate/>
      <Image src={getPokemonSprite(gen.pokemon[6].id)} noAnimate/>
    </div>
  </div>
  )
)

const GenerationDropdown: React.FC<iDropdownProps> = ({ onChange }) => {
  const { generations, isLoading } = useApi()
  const [ selected, setSelected ] = useState<GenerationResponse | null>(null)

  useEffect(() => {
    if (generations.length && !selected) {
      setSelected(generations[0])
    }
  }, [generations, selected])

  useEffect(() => {
    if (selected) {
      console.log('HERE', selected.name)
      onChange(selected)
    }
  }, [selected, onChange])


  if (!selected || isLoading) {
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
    )
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">{selected.versions[0]}</Dropdown.Toggle>
      <Dropdown.Menu>
        {generations.map(gen => 
          <Dropdown.Item 
            as={GenItem} 
            gen={gen} 
            key={gen.id} 
            onSelected={setSelected} 
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}



export default GenerationDropdown