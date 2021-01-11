import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from 'components/Search'
import { API_List } from 'helpers/types'
import useAllService from 'hooks/useAllService'
import GenDropdown from 'components/GenDropdown'
import Container from "react-bootstrap/Container";
import PokedexLoader from 'components/PokedexLoader'
import React, { useEffect, useRef, useState } from 'react'
import { useGenerationContext } from 'context/GenerationContext'

const PokedexPage: React.FC = () => {

  const [searchValue, setSearchValue] = useState("")

  const [loadID, setLoadID] = useState(0)
  const [maximumItems, setMaximumItems] = useState(6)

  const savedItems = useRef<API_List>([])
  const [items, setItems] = useState<API_List>([])

  const generations = useGenerationContext()
  const allPokemon = useAllService('pokemon')

  useEffect(() => {
    if(allPokemon.status === 'loaded' && searchValue.length >= 3) {
      setItems(allPokemon.payload.filter(({ name }) => name.indexOf(searchValue) > -1 && name.indexOf('-') === 1))
    } else {
      setLoadID(0)
      setItems(savedItems.current)
    }
  }, [allPokemon, searchValue])

  useEffect(() => {
    if(generations.status === 'loaded') {
      const newItems = generations.current.pokemon.slice(0, maximumItems)
      
      savedItems.current = newItems
      setItems(newItems)
    }
  }, [generations, maximumItems])
     
  return (
    <Container className="wide">
      <Row>
        <Col>
          <GenDropdown onChange={() => setLoadID(0)} />
        </Col>
        <Col>
          <Search value={searchValue} onChange={setSearchValue} />
        </Col>
      </Row>
      <PokedexLoader 
        items={items}
        loadID={loadID} 
        maximumItems={maximumItems}
        onCardLoad={() => setLoadID(s => s + 1)}
        onEndVisible={() => setMaximumItems(s => s + 3)}
      />
    </Container>
  )
}

export default PokedexPage