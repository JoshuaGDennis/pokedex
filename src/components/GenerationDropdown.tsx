import Image from './Image'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Dropdown from 'react-bootstrap/Dropdown'
import styles from 'styles/GenerationDropdown.module.scss'
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react'
import { GenerationResponse, getGeneration, getGenerationIds, getPokemonSprite } from 'helpers'

interface iDropdownProps {
  onChange: Dispatch<SetStateAction<GenerationResponse | null>>
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
  const [ generations, setGenerations ] = useState<GenerationResponse[]>([])
  const [ selected, setSelected ] = useState<GenerationResponse | null>(null)

  const handleOnChange = (gen: GenerationResponse) => {
    onChange(gen)
    setSelected(gen)
  }

  useEffect(() => {
    getGenerationIds().then((ids: number[]) => {
      Promise.all(ids.map(getGeneration)).then((gens => {
        setGenerations(gens)
        setSelected(gens[0])
        onChange(gens[0])
      }))
    })
  }, [onChange])

  if (!selected) {
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
        {generations.map(gen => <Dropdown.Item as={GenItem} gen={gen} key={gen.id} onSelected={handleOnChange} />)}
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default GenerationDropdown