import React, { useState, useEffect } from 'react'
import Pokemon from './Pokemon'
import axios from 'axios'

const PokemonList = () => {
  // Pokemon State
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      let pokemonArr = res.data.results
      // Get types for each Pokemon
      pokemonArr.map(async poke => {
        let res = await axios.get(poke.url)
        poke.types = res.data.types
      })
      setPokemon(pokemonArr)
    }
    fetchPokemon()
  }, [])

  // Team State
  const [team, setTeam] = useState([])
  const [teamCount, setTeamCount] = useState(0)

  const addPokemon = (name, pokeIndex) => {
    if(teamCount < 6) {
      // Increments Team Count
      setTeamCount(teamCount + 1)
      // Create Pokemon object
      const pokemon = { name, pokeIndex }
      // Pushes New Team Member to Team
      team.push(pokemon)
      setTeam(team)
    } else {
      console.log('Party is full')
    }
  }

  const removePokemon = (index) => {
    if(teamCount > 0) {
      setTeamCount(teamCount - 1)

      // Filters team based on the index of the array selected
      setTeam(team.filter((_, i) => i !== index))
    } else {
      console.log('Party is empty')
    }
  }

  return (
    <div>
      <h2>Choose Your Team</h2>
      {pokemon.map(({ name, url }, index) => (
        <Pokemon onClick={() => addPokemon(name, index)} pokeIndex={index} name={name} key={url} url={url} />
      ))}
      <h1>Team</h1>
      {team.map(({ name, pokeIndex }, index) => (
        <Pokemon onClick={() => removePokemon(index)} pokeIndex={pokeIndex} name={name} key={index} />
      ))}
    </div>
  )
}

export default PokemonList;