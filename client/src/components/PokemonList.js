import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import axios from 'axios'

const PokemonList = () => {
  // Pokemon State
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')

      setPokemon(res.data.results)
    }
    fetchPokemon()
  })

  // Team State
  const [team, setTeam] = useState([])
  const [teamCount, setTeamCount] = useState(0)

  const addPokemon = (name) => {
    if(teamCount < 6) {
      // Increments Team Count
      setTeamCount(teamCount + 1)

      // Pushes New Team Member to Team
      team.push(name)
      setTeam(team)
    } else {
      console.log('Party is full')
    }
  }

  const removePokemon = (name) => {
    if(team.includes(name)) {
      // Filter team if the pokemon is not equal to the pokemon selected
      setTeam(team.filter(pokemon => pokemon !== name))
    }
  }

  return (
    <div>
      <h2>Choose Your Team</h2>
      {pokemon.map(({ name, url }, index) => (
        <Pokemon onClick={() => addPokemon(name)} url={url} name={name} key={index} />
      ))}
      {team.map((name, index) => (
        <Pokemon onClick={() => removePokemon(name)} name={name} key={index} />
      ))}
    </div>
  )
}

export default PokemonList;