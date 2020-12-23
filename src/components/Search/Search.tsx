import "./Search.scss"
import * as React from 'react'
import * as API from 'helpers/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface iProps {
  onSubmit(results: {id: number, name: string}[]): void
  onReset(): void
}

const { getAllPokemon } = API
const { useEffect, useState} = React;

const Search: React.FC<iProps> = ({ onSubmit, onReset }) => {
  const [value, setValue] = useState("")
  const [isInvalid, setIsInvalid] = useState(false)
  const [isValidated, setIsValidated] = useState(false)

  const [allPokemon, setAllPokemon] = useState<{id: number, name: string}[]>([])

  useEffect(() => {
    getAllPokemon().then(setAllPokemon)
  }, [])

  const handleChange = (event: React.ChangeEvent<any>) => {
    const val = event.target.value

    if(val.length === 0 || val === "" || !val) {
      setIsInvalid(false)
      setIsValidated(false)
      onReset()
    }

    setValue(val)
  }

  const handleSubmit = (event: React.FormEvent<HTMLElement & { checkValidity(): boolean }>) => {
    const form = event.currentTarget

    event.preventDefault()

    if(!form.checkValidity() || value.length < 3) {
      event.stopPropagation()
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
      onSubmit(allPokemon.filter(({ name }) => name.indexOf(value) > -1 && name.indexOf('-') === -1))
    }

    setIsValidated(true)
  }

  return (
    <Form 
      inline 
      noValidate 
      validated={isValidated} 
      onSubmit={handleSubmit} 
      className={`search-control ${isInvalid ? 'invalid' : ''}`}
    >
      <Form.Group>
        <Form.Control 
          required  
          type="text"
          placeholder="Search pokemon..."
          value={value}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">SOME ERROR HERE</Form.Control.Feedback>
      </Form.Group>
      {allPokemon.length ? <Button type="submit" disabled={isInvalid}>Search</Button> : null}
    </Form>
  )
}

export default Search