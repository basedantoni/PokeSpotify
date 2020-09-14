import React from 'react'
import axios from 'axios'

const SelectionGrid = () => {
  const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
  console.log(pokemon)
  return (
    <div>
      <h2>Choose Your Team</h2>
    </div>
  )
}

export default SelectionGrid;