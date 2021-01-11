import "./Search.scss"
import React from 'react'

interface iProps {
  onChange(value: string): void
  value: string
}

const Search: React.FC<iProps> = ({ onChange, value }) => (
  <div className="search-control">
    <input 
      type="text" 
      value={value} 
      placeholder="Search pokemon..." 
      onChange={e => onChange(e.target.value)}
    />
  </div>
)

export default Search