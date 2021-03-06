import "./Search.scss"
import * as React from 'react'
import * as Hooks from 'helpers/hooks'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'

interface iProps {
  onSubmit(results: {id: number, name: string}[]): void
  onReset(): void
}

const { useState} = React;
const { useSearch } = Hooks

const Search: React.FC<iProps> = ({ onSubmit, onReset }) => {
  const [value, setValue] = useState("")

  const searchResults = useSearch(value)

  const [isInvalid, setIsInvalid] = useState(false)
  const [isValidated, setIsValidated] = useState(false)
  const [ searchType, setSearchType ] = useState<'NAME' | 'ID'>('NAME')


  const resetSearch = () => {
    setIsInvalid(false)
    setIsValidated(false)
    onReset()
  }

  const handleChange = (event: React.ChangeEvent<any>) => {
    const val = event.target.value

    if(val.length === 0 || val === "" || !val) {
      resetSearch()
    }

    setValue(val)
  }

  const handleTypeChange = (type: 'NAME' | 'ID') => {
    setSearchType(type)
    setValue('')
    resetSearch()
  }

  const handleSubmit = (event: React.FormEvent<HTMLElement & { checkValidity(): boolean }>) => {
    const form = event.currentTarget

    event.preventDefault()

    if(!form.checkValidity() || value.length < 3) {
      event.stopPropagation()
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
      onSubmit(searchResults)
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
        <InputGroup>
          <InputGroup.Prepend>
            <Dropdown className="search-control-dropdown">
              <Dropdown.Toggle />
              <Dropdown.Menu>
                <Dropdown.Item active={searchType === 'NAME'} onClick={() => handleTypeChange('NAME')}>By Name</Dropdown.Item>
                <Dropdown.Item active={searchType === 'ID'} onClick={() => handleTypeChange('ID')}>By ID</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup.Prepend>
          <Form.Control 
            required  
            type={searchType === 'NAME' ? 'text' : 'number'}
            placeholder={`Search by ${searchType.toLowerCase()}`}
            value={value}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">SOME ERROR HERE</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button type="submit" disabled={isInvalid}>Search</Button>
    </Form>
  )
}

export default Search