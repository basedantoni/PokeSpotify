import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import Team from './Team'
import axios from 'axios'

const SelectionGrid = () => {
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')

      setPokemon(res.data.results)
    }
    fetchPokemon()
  })

  const [team, setTeam] = useState([])
  
  const [teamCount, setTeamCount] = useState(0)

  const handleClick = () => {
    if(teamCount < 6) {
      setTeamCount(teamCount + 1)
    } else {
      console.log('Party is full')
    }
  }

  return (
    <div>
      <h2>Choose Your Team</h2>
      {pokemon.map(poke => (
        <Pokemon onClick={handleClick} name={poke.name} key={poke.url} />
      ))}
      <Team />
    </div>
  )
}

export default SelectionGrid;